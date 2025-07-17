import type { MapData, MapSelector } from "@/app/map/[id]/map.types";
import type { Boss } from "@/app/boss/[id]/_components/boss.types";

export interface MapOfTarkovSelectorTypes {
  setImageSelect: (val: string) => void;
  imageSelect: string;
  mapData: MapOfTarkov;
}

export interface MapOfTarkovClient {
  mapData: MapOfTarkov;
  imageSelect: string;
}

export interface MapOfTarkovViewTypes {
  mapData: MapOfTarkov;
}

interface FindInfo {
  id: string;
  map_bounds: [number, number][];
  image_bounds: [number, number][];
  name: string;
  image: string;
  default_zoom_level: number;
}

export interface ExtractionsTransitsTypes {
  extractionsOrTransits: ExtractionsOrTransits[];
  title: string;
}

export interface ExtractionsOrTransits {
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

export interface MapViewTypes {
  mapData: MapData;
  imageSelect: string;
}

export type CoordPx = [number, number, number, number];

export interface MapOfTarkov {
  boss_info: Boss[];
  map_info: MapData;
  extraction_info: ExtractionsOrTransits[];
  transits_info: ExtractionsOrTransits[];
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

export interface LatLng {
  lat: number;
  lng: number;
}

export interface FindLocationInnerTypes {
  findInfo: FindInfo;
  imageCoord: ImageCoord;
  isViewWhere: boolean;
  setMousePosition: (latlng: LatLng) => void;
}

export interface FindLocationTypes {
  findInfo: FindInfo;
}

interface ImageCoord {
  x: number;
  y: number;
}

export interface FindLocationControllerTypes {
  imageCoord: { x: number; y: number };
  isViewWhere: boolean;
  default_zoom_level: number;
}

export interface FindLocationModalTypes {
  isOpen: boolean;
  onClose: (val: boolean) => void;
}

export interface MapBossTypes {
  bossInfo: Boss[];
}
