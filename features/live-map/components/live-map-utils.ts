import type { LiveMapFloor } from "@/types/api/live-map";

export interface LiveMapLocation {
  x: number;
  y: number;
  z: number;
  yaw: number;
}

export function parseWhereText(text: string): LiveMapLocation | null {
  if (!text) {
    return null;
  }

  const source = text.includes("]_") ? text.split("]_")[1] : text;
  const matches = source.match(/[-+]?\d*\.?\d+/g);

  if (!matches || matches.length < 7) {
    return null;
  }

  const x = Number.parseFloat(matches[0]);
  const z = Number.parseFloat(matches[1]);
  const y = Number.parseFloat(matches[2]);
  const qx = Number.parseFloat(matches[3]);
  const qy = Number.parseFloat(matches[4]);
  const qz = Number.parseFloat(matches[5]);
  const qw = Number.parseFloat(matches[6]);

  if ([x, y, z, qx, qy, qz, qw].some((value) => Number.isNaN(value))) {
    return null;
  }

  const sinyCosp = 2 * (qw * qy - qz * qx);
  const cosyCosp = 1 - 2 * (qy * qy + qx * qx);
  let yaw = Math.atan2(sinyCosp, cosyCosp);

  if (yaw < 0) {
    yaw += 2 * Math.PI;
  }

  return { x, y, z, yaw: (yaw * 180) / Math.PI };
}

export function findFloorForHeight(
  floors: LiveMapFloor[],
  height: number,
): LiveMapFloor | null {
  return (
    floors.find((floor) => {
      if (floor.min_z === null || floor.max_z === null) {
        return false;
      }

      return height >= floor.min_z && height < floor.max_z;
    }) ??
    floors.find((floor) => floor.min_z === null && floor.max_z === null) ??
    floors[0] ??
    null
  );
}
