import { spawnSync } from "node:child_process";
import fs from "node:fs/promises";
import fsSync from "node:fs";
import path from "node:path";

const baseUrl = process.env.PERF_BASE_URL ?? "https://eftlibrary.com";
const label = process.env.PERF_LABEL ?? "before-static-json";
const runs = Number(process.env.PERF_RUNS ?? "1");
const selectedPages = new Set(
  (process.env.PERF_PAGES ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean),
);

const pages = [
  { path: "/", name: "home" },
  { path: "/roadmap", name: "roadmap" },
  { path: "/price", name: "price" },
  { path: "/rank", name: "rank" },
  { path: "/story/tour", name: "story" },
  { path: "/quest/prapor", name: "quest" },
  { path: "/quest/detail/shooting-cans", name: "quest-detail" },
  { path: "/item/info/adrenaline-injector", name: "item-detail" },
  { path: "/hideout", name: "hideout" },
  { path: "/boss/reshala", name: "boss-detail" },
  { path: "/event?id=1", name: "event" },
  { path: "/event/detail/event27", name: "event-detail" },
  { path: "/map-of-tarkov/customs", name: "map-of-tarkov" },
  {
    path: "/community/detail/809203066355191808-saiteu-seongneung-mic-nae-wici-cajgi-gineung-gaeseon-annae",
    name: "community-detail",
  },
  { path: "/wipe", name: "wipe" },
  { path: "/minigame", name: "minigame" },
  { path: "/live-map/customs", name: "live-map-customs" },
  { path: "/live-map/streets-of-tarkov", name: "live-map-streets-of-tarkov" },
];

const chromeCandidates = [
  process.env.PERF_CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  "/Applications/Microsoft Edge Canary.app/Contents/MacOS/Microsoft Edge Canary",
];

function findExecutable(root, executableNames) {
  if (!root || !fsSync.existsSync(root)) {
    return null;
  }

  const entries = fsSync.readdirSync(root, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = path.join(root, entry.name);

    if (entry.isFile() && executableNames.has(entry.name)) {
      return entryPath;
    }

    if (entry.isDirectory()) {
      const found = findExecutable(entryPath, executableNames);

      if (found) {
        return found;
      }
    }
  }

  return null;
}

function findChromePath() {
  for (const candidate of chromeCandidates) {
    if (candidate && fsSync.existsSync(candidate)) {
      return candidate;
    }
  }

  const executableNames = new Set([
    "Chromium",
    "Google Chrome for Testing",
    "Microsoft Edge",
    "Microsoft Edge Canary",
    "chrome",
    "chrome.exe",
  ]);
  const cacheCandidates = [
    path.join(process.cwd(), ".cache", "performance-browsers"),
    path.join(process.env.HOME ?? "", "Library", "Caches", "ms-playwright"),
    path.join(process.env.HOME ?? "", ".cache", "ms-playwright"),
  ];

  for (const cacheDir of cacheCandidates) {
    const found = findExecutable(cacheDir, executableNames);

    if (found) {
      return found;
    }
  }

  return null;
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function metric(audits, key) {
  const audit = audits[key];

  if (!audit) {
    return "-";
  }

  return audit.displayValue ?? String(audit.numericValue ?? "-");
}

function score(categories, key) {
  const category = categories[key];

  if (!category || typeof category.score !== "number") {
    return "-";
  }

  return String(Math.round(category.score * 100));
}

function runLighthouse(url, outputPath) {
  const chromePath = findChromePath();

  if (!chromePath) {
    throw new Error(
      [
        "No Chrome executable found for Lighthouse.",
        "Install Chrome or run:",
        "  pnpm dlx @puppeteer/browsers install chrome@stable --path .cache/performance-browsers",
        "Then retry, or set PERF_CHROME_PATH to the Chrome executable path.",
      ].join("\n"),
    );
  }

  const result = spawnSync(
    "pnpm",
    [
      "dlx",
      "lighthouse",
      url,
      "--quiet",
      "--output=json",
      `--output-path=${outputPath}`,
      "--only-categories=performance",
      "--chrome-flags=--headless",
    ],
    {
      encoding: "utf8",
      env: {
        ...process.env,
        CHROME_PATH: chromePath,
      },
      stdio: "pipe",
    },
  );

  if (result.status !== 0) {
    throw new Error(
      [
        `Lighthouse failed for ${url}`,
        result.stdout.trim(),
        result.stderr.trim(),
      ].filter(Boolean).join("\n"),
    );
  }
}

async function readSummary(jsonPath) {
  const raw = await fs.readFile(jsonPath, "utf8");
  const report = JSON.parse(raw);
  const audits = report.audits ?? {};
  const categories = report.categories ?? {};

  return {
    cls: metric(audits, "cumulative-layout-shift"),
    fcp: metric(audits, "first-contentful-paint"),
    lcp: metric(audits, "largest-contentful-paint"),
    requests: audits["network-requests"]?.details?.items?.length ?? "-",
    score: score(categories, "performance"),
    tbt: metric(audits, "total-blocking-time"),
    transfer: metric(audits, "total-byte-weight"),
    ttfb: metric(audits, "server-response-time"),
  };
}

async function main() {
  if (!Number.isFinite(runs) || runs < 1) {
    throw new Error("PERF_RUNS must be a positive number.");
  }

  const targetPages = selectedPages.size > 0
    ? pages.filter((page) => selectedPages.has(page.name))
    : pages;

  if (targetPages.length === 0) {
    throw new Error(`No pages matched PERF_PAGES=${Array.from(selectedPages).join(",")}`);
  }

  const rootDir = path.join("docs", "performance", "results", label, today());
  await fs.mkdir(rootDir, { recursive: true });

  const rows = [];

  for (const page of targetPages) {
    for (let run = 1; run <= runs; run += 1) {
      const url = new URL(page.path, baseUrl).toString();
      const fileName = `${page.name}${runs > 1 ? `-run-${run}` : ""}.json`;
      const outputPath = path.join(rootDir, fileName);

      console.log(`measuring ${page.name} run ${run}/${runs}: ${url}`);
      runLighthouse(url, outputPath);

      const summary = await readSummary(outputPath);
      rows.push({
        ...summary,
        name: page.name,
        path: page.path,
        run,
        url,
      });
    }
  }

  const md = [
    `# Production Performance ${label} ${today()}`,
    "",
    `- 기준 URL: \`${baseUrl}\``,
    `- 실행 횟수: ${runs}`,
    `- 결과 원본: \`${rootDir}\``,
    "",
    "| page | run | score | FCP | LCP | TBT | CLS | TTFB | transfer | requests |",
    "| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |",
    ...rows.map((row) =>
      `| \`${row.name}\` | ${row.run} | ${row.score} | ${row.fcp} | ${row.lcp} | ${row.tbt} | ${row.cls} | ${row.ttfb} | ${row.transfer} | ${row.requests} |`
    ),
    "",
    "## 대상 페이지",
    "",
    ...targetPages.map((page) => `- \`${page.name}\`: \`${page.path}\``),
    "",
  ].join("\n");

  const summaryPath = path.join(rootDir, "summary.md");
  await fs.writeFile(summaryPath, md, "utf8");
  console.log(`summary saved: ${summaryPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
