import type { BtrRoutePointV3, BtrRouteStopV3, BtrRouteV3 } from "@/types/api/live-map";

export const BTR_ROUTE_COLORS = ["#f97316", "#38bdf8", "#a78bfa", "#22c55e", "#f43f5e"];

export type BtrRouteStatus = {
  kind: "not-spawned" | "moving" | "stopped" | "raid-over" | "unknown";
  position: { x: number; z: number } | null;
  nextStop: BtrRouteStopV3 | null;
  etaSeconds: number | null;
  departureSeconds: number | null;
  currentStop: BtrRouteStopV3 | null;
  previousStop: BtrRouteStopV3 | null;
};

export function interpolateAlongPath(points: Array<{ x: number; z: number }>, progress: number) {
  if (points.length === 0) return null;
  if (points.length === 1) return points[0];
  const clamped = Math.max(0, Math.min(1, progress));
  const lengths = points.slice(1).map((point, index) =>
    Math.hypot(point.x - points[index].x, point.z - points[index].z));
  const total = lengths.reduce((sum, length) => sum + length, 0);
  if (total === 0) return points[0];
  const target = total * clamped;
  let traversed = 0;
  for (let index = 0; index < lengths.length; index += 1) {
    const length = lengths[index];
    if (traversed + length >= target) {
      const segmentProgress = length === 0 ? 0 : (target - traversed) / length;
      return {
        x: points[index].x + (points[index + 1].x - points[index].x) * segmentProgress,
        z: points[index].z + (points[index + 1].z - points[index].z) * segmentProgress,
      };
    }
    traversed += length;
  }
  return points.at(-1) ?? null;
}

function pathSection(points: BtrRoutePointV3[], fromOrder: number | null, toOrder: number | null) {
  const sorted = [...points].sort((a, b) => a.sort_order - b.sort_order);
  const from = fromOrder === null ? 0 : Math.max(0, sorted.findIndex((point) => point.sort_order >= fromOrder));
  const foundTo = toOrder === null ? sorted.length - 1 : sorted.findIndex((point) => point.sort_order >= toOrder);
  const to = foundTo < 0 ? sorted.length - 1 : foundTo;
  return sorted.slice(Math.min(from, to), Math.max(from, to) + 1);
}

export function getBtrRouteStatus(route: BtrRouteV3, remaining: number | null): BtrRouteStatus {
  const stops = [...route.stops].sort((a, b) => a.visit_order - b.visit_order);
  if (remaining === null || route.spawn_remaining_seconds === null || stops.length === 0) {
    return { kind: "unknown", position: null, nextStop: stops[0] ?? null, etaSeconds: null, departureSeconds: null, currentStop: null, previousStop: null };
  }
  if (remaining > route.spawn_remaining_seconds) {
    return { kind: "not-spawned", position: null, nextStop: stops[0], etaSeconds: remaining - route.spawn_remaining_seconds, departureSeconds: null, currentStop: null, previousStop: null };
  }
  const first = stops[0];
  if (remaining > first.arrival_remaining_seconds) {
    const progress = (route.spawn_remaining_seconds - remaining) / (route.spawn_remaining_seconds - first.arrival_remaining_seconds);
    return { kind: "moving", position: interpolateAlongPath(pathSection(route.points, null, first.route_point_order), progress), nextStop: first, etaSeconds: remaining - first.arrival_remaining_seconds, departureSeconds: null, currentStop: null, previousStop: null };
  }
  // The API may contain return trips and repeated visits. Every visit_order entry
  // remains significant, even when multiple entries point at the same static stop.
  for (let index = 0; index < stops.length; index += 1) {
    const stop = stops[index];
    const departure = stop.departure_remaining_seconds ?? stop.arrival_remaining_seconds - route.stop_duration_seconds;
    if (remaining <= stop.arrival_remaining_seconds && remaining > departure) {
      return { kind: "stopped", position: { x: stop.x, z: stop.z }, nextStop: stops[index + 1] ?? null, etaSeconds: 0, departureSeconds: remaining - departure, currentStop: stop, previousStop: index > 0 ? stops[index - 1] : null };
    }
    const next = stops[index + 1];
    if (next && remaining <= departure && remaining > next.arrival_remaining_seconds) {
      const progress = (departure - remaining) / (departure - next.arrival_remaining_seconds);
      return { kind: "moving", position: interpolateAlongPath(pathSection(route.points, stop.route_point_order, next.route_point_order), progress), nextStop: next, etaSeconds: remaining - next.arrival_remaining_seconds, departureSeconds: null, currentStop: null, previousStop: stop };
    }
  }
  return { kind: "raid-over", position: null, nextStop: null, etaSeconds: null, departureSeconds: null, currentStop: null, previousStop: stops.at(-1) ?? null };
}

export function formatBtrTime(seconds: number) {
  const value = Math.max(0, Math.round(seconds));
  return `${Math.floor(value / 60)}:${String(value % 60).padStart(2, "0")}`;
}
