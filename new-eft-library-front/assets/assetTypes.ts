export interface JPG extends Coordinate {
  color?: string;
}

export interface SVG {
  color?: string;
  opacity: number | string;
  width: number | string;
  height: number | string;
  x: number;
  y: number;
  scale?: number;
}

interface Coordinate {
  x: number;
  y: number;
  scale: number;
}

export interface Size {
  width: number;
  height: number;
}
