export interface JPG extends Coordinate {
  color?: string;
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
