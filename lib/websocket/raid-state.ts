import type { RaidState } from "@/store/ws-store";

const supportedMaps = new Set([
  "customs", "woods", "shoreline", "factory", "interchange", "the-lab",
  "the-labyrinth", "lighthouse", "reserve", "streets-of-tarkov", "terminal", "ground-zero",
]);

function utcTime(value: unknown): number | null {
  if (typeof value !== "string" || !/(?:Z|[+-]\d{2}:\d{2})$/i.test(value)) return null;
  const time = Date.parse(value);
  return Number.isFinite(time) ? time : null;
}

export function isRaidState(value: unknown): value is RaidState {
  if (!value || typeof value !== "object") return false;
  const state = value as Record<string, unknown>;
  if (!((typeof state.map === "string" || state.map === null) &&
    (typeof state.started_at === "string" || state.started_at === null) &&
    typeof state.is_active === "boolean" && typeof state.transit_count === "number")) return false;
  if (state.session_id != null && (typeof state.session_id !== "string" || !/^[a-f0-9]{64}$/.test(state.session_id))) return false;
  if (state.timer_observed_at == null && state.raid_ends_at == null) return true;
  const observedAt = utcTime(state.timer_observed_at);
  const endsAt = utcTime(state.raid_ends_at);
  return observedAt !== null && endsAt !== null && endsAt > observedAt &&
    state.is_active && typeof state.map === "string" && supportedMaps.has(state.map) &&
    typeof state.session_id === "string" && utcTime(state.started_at) !== null;
}

/** An absolute deadline, never a duration restarted on delivery or reconnection. */
export function getAutomaticRaidTimer(state: RaidState | null | undefined, map: string, now: number) {
  if (!state || !isRaidState(state) || !state.is_active || state.map !== map || !state.session_id) return null;
  const endsAt = utcTime(state.raid_ends_at);
  const observedAt = utcTime(state.timer_observed_at);
  if (endsAt === null || observedAt === null) return null;
  return { endsAt, observedAt, remainingSeconds: Math.max(0, Math.ceil((endsAt - now) / 1000)) };
}

export function formatRaidRemaining(seconds: number) {
  const whole = Math.max(0, Math.ceil(seconds));
  return `${Math.floor(whole / 60)}:${String(whole % 60).padStart(2, "0")}`;
}
