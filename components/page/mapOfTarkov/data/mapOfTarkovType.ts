import type { MapData, MapSelector } from "../../mapDetail/data/mapType";
import type { Boss } from "../../boss/data/bossTypes";

export interface MapOfTarkovSelectorClient {
  setImageSelect: (val: string) => void;
  imageSelect: string;
  mapData: MapOfTarkov;
}

export interface MapOfTarkovClient {
  mapData: MapOfTarkov;
  imageSelect: string;
}

export interface MapOfTarkovWrapper {
  mapData: MapOfTarkov;
}

interface FindInfo {
  id: string;
  map_bounds: [number, number][];
  image_bounds: [number, number][];
  name: string;
  image: string;
}

export interface ExtractionRender {
  extractionInfo: Extraction;
}

export interface Extraction {
  id: string;
  name: LocaleName;
  faction: string;
  single_use: boolean;
  tip: LocaleName;
  image: string;
  image_thumbnail: string;
  always_available: boolean;
  requirements: LocaleName;
  map: string;
}

export interface MapInfo {
  mapData: MapData;
  imageSelect: string;
  findInfo: FindInfo;
}

export type CoordPx = [number, number, number, number];

export interface MapOfTarkov {
  boss_info: Boss[];
  map_info: MapData;
  extraction_info: Extraction[];
  transits_info: Extraction[];
  map_id: string;
  map_selector: MapSelector[];
  find_info: FindInfo;
}

interface LocaleName {
  en: string;
  ja: string;
  ko: string;
}

export interface BossClient {
  bossData: Boss;
}

export interface MapInfoInner {
  findInfo: FindInfo;
  imageCoord: ImageCoord;
  isViewWhere: boolean;
  setMousePosition: (latlng: any) => void;
}

interface ImageCoord {
  x: number;
  y: number;
}
