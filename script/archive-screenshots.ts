import { chromium } from "@playwright/test";
import fs from "node:fs/promises";

const baseUrl = "https://eftlibrary.com";

const pages = [
  { path: "/", name: "home" },
  { path: "/roadmap", name: "roadmap" },
  { path: "/price", name: "price" },
  { path: "/rank", name: "rank" },
  { path: "/story/tour", name: "story" },
  { path: "/quest/54cb50c76803fa8b248b4571", name: "quest" },
  { path: "/quest/detail/shooting-cans", name: "quest-detail" },
  { path: "/item/info/adrenaline-injector", name: "item-detail" },
  { path: "/hideout", name: "hideout" },
  { path: "/boss", name: "boss" },
  { path: "/event?id=1", name: "event" },
  { path: "/event/detail/event27", name: "event-detail" },
  { path: "/map-of-tarkov/CUSTOMS", name: "map-of-tarkov" },
  { path: "/community", name: "community" },
  { path: "/wipe", name: "wipe" },
  { path: "/minigame", name: "minigame" },
];

await fs.mkdir("archive/screenshots/legacy", { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1440, height: 1200 },
});

for (const item of pages) {
  await page.goto(`${baseUrl}${item.path}`, {
    waitUntil: "networkidle",
  });

  await page.screenshot({
    path: `archive/screenshots/legacy/${item.name}.png`,
    fullPage: true,
  });

  console.log(`saved: ${item.name}`);
}

await browser.close();
