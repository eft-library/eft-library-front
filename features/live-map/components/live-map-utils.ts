import type { LiveMapFloor } from "@/types/api/live-map";

export interface LiveMapLocation {
  x: number;
  y: number;
  z: number;
  yaw: number;
}

function getFloorMinY(floor: LiveMapFloor) {
  return floor.min_y ?? floor.min_z ?? null;
}

function getFloorMaxY(floor: LiveMapFloor) {
  return floor.max_y ?? floor.max_z ?? null;
}

function getZoneMinY(zone: LiveMapFloor["zones"][number]) {
  return zone.override_min_y ?? zone.override_min_z ?? null;
}

function getZoneMaxY(zone: LiveMapFloor["zones"][number]) {
  return zone.override_max_y ?? zone.override_max_z ?? null;
}

function isBetween(value: number, first: number, second: number) {
  const min = Math.min(first, second);
  const max = Math.max(first, second);

  return value >= min && value <= max;
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
  const y = Number.parseFloat(matches[1]);
  const z = Number.parseFloat(matches[2]);
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
      const minY = getFloorMinY(floor);
      const maxY = getFloorMaxY(floor);

      if (minY === null || maxY === null) {
        return false;
      }

      return isBetween(height, minY, maxY);
    }) ??
    floors.find((floor) => getFloorMinY(floor) === null && getFloorMaxY(floor) === null) ??
    floors[0] ??
    null
  );
}

export function findFloorForLocation(
  floors: LiveMapFloor[],
  location: Pick<LiveMapLocation, "x" | "y" | "z">,
): LiveMapFloor | null {
  const zoneFloor = floors.find((floor) =>
    (floor.zones ?? []).some((zone) => {
      if (
        !isBetween(location.x, zone.area_x_min, zone.area_x_max) ||
        !isBetween(location.z, zone.area_z_min, zone.area_z_max)
      ) {
        return false;
      }

      const minY = getZoneMinY(zone);
      const maxY = getZoneMaxY(zone);

      if (minY === null || maxY === null) {
        return false;
      }

      return isBetween(location.y, minY, maxY);
    }),
  );

  if (zoneFloor) {
    return zoneFloor;
  }

  return (
    floors.find((floor) => {
      const minY = getFloorMinY(floor);
      const maxY = getFloorMaxY(floor);

      if (minY === null || maxY === null) {
        return false;
      }

      return isBetween(location.y, minY, maxY);
    }) ??
    floors.find((floor) => getFloorMinY(floor) === null && getFloorMaxY(floor) === null) ??
    floors[0] ??
    null
  );
}
