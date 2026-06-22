import { chromium } from "@playwright/test";
import fs from "node:fs/promises";

// npx tsx script/archive-screenshots.ts

const baseUrl = "https://eftlibrary.com";

const pages = [
  //   { path: "/", name: "home" },
  //   { path: "/roadmap", name: "roadmap" },
  //   { path: "/price", name: "price" },
  //   { path: "/rank", name: "rank" },
  //   { path: "/story/tour", name: "story" },
  //   { path: "/quest/prapor", name: "quest" },
  //   { path: "/quest/detail/shooting-cans", name: "quest-detail" },
  //   { path: "/item/info/adrenaline-injector", name: "item-detail" },
  //   { path: "/hideout", name: "hideout" },
  { path: "/boss/reshala", name: "boss-detail" },
  //   { path: "/event?id=1", name: "event" },
  //   { path: "/event/detail/event27", name: "event-detail" },
  //   { path: "/map-of-tarkov/customs", name: "map-of-tarkov" },
  {
    path: "/community/detail/809203066355191808-saiteu-seongneung-mic-nae-wici-cajgi-gineung-gaeseon-annae",
    name: "community-detail",
  },
  //   { path: "/wipe", name: "wipe" },
  //   { path: "/minigame", name: "minigame" },
];

const themes = ["dark", "light"] as const;

async function main() {
  const browser = await chromium.launch();

  try {
    for (const theme of themes) {
      const outputDir = `archive/screenshots/legacy/${theme}`;
      await fs.mkdir(outputDir, { recursive: true });

      const context = await browser.newContext({
        viewport: { width: 1440, height: 1200 },
        colorScheme: theme,
      });

      await context.addInitScript((selectedTheme) => {
        window.localStorage.setItem("theme", selectedTheme);
      }, theme);

      const page = await context.newPage();

      try {
        for (const item of pages) {
          await page.goto(`${baseUrl}${item.path}`, {
            waitUntil: "networkidle",
          });

          await page.screenshot({
            path: `${outputDir}/${item.name}.png`,
            fullPage: true,
          });

          console.log(`saved: ${theme}/${item.name}`);
        }
      } finally {
        await context.close();
      }
    }
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
