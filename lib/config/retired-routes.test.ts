import assert from "node:assert/strict";
import { test } from "node:test";
import { isRetiredRoute } from "./retired-routes";

test("retired 3D map URLs are excluded from backend navigation and sitemap data", () => {
  for (const url of ["/map", "/map/", "/map/factory", "/map/factory?floor=1#map", "https://eftlibrary.com/map/woods", "/minigame"]) {
    assert.equal(isRetiredRoute(url), true, url);
  }
});

test("2D maps, live maps and other map-prefixed pages remain available", () => {
  for (const url of ["/map-of-tarkov", "/map-of-tarkov/factory", "https://eftlibrary.com/map-of-tarkov/woods", "/live-map", "/mapping", "/modding", "/traders"]) {
    assert.equal(isRetiredRoute(url), false, url);
  }
});
