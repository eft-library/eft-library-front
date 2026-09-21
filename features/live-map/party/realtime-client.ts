import type {
  PartySocketEventV3,
  PartyViewMapEventV3,
  PartyViewMapCommandV3,
  PartyRealtimeSnapshotV3,
  PartyPingEventV3,
  PartyPositionEventV3,
  PartyPointCommandV3,
  PartySocketErrorV3,
} from "@/types/api/live-map-party";

// Preserve PostgreSQL/Python sub-millisecond timestamps when ordering events.
function eventTime(value: string) {
  const fraction = value.match(/\.(\d+)(?:Z|[+-]\d{2}:\d{2})$/)?.[1] ?? "";
  return (
    Date.parse(value) +
    (fraction.length > 3 ? Number(`0.${fraction.slice(3)}`) : 0)
  );
}

export type PartyConnectionState =
  | "connecting"
  | "connected"
  | "reconnecting"
  | "auth-required"
  | "limited"
  | "stopped";
export interface PartyRealtimeView {
  connection: PartyConnectionState;
  snapshot?: PartyRealtimeSnapshotV3;
  pings: PartyPingEventV3[];
  positions: PartyPositionEventV3[];
  viewMaps: PartyViewMapEventV3[];
  error?: PartySocketErrorV3;
  cooldown: boolean;
}

/** One instance per account/room. REST responses never enter this state. */
export class PartyRealtimeClient {
  private socket: WebSocket | null = null;
  private disposed = false;
  private suspended = false;
  private generation = 0;
  private attempts = 0;
  private authAttempts = 0;
  private reconnectTimer?: ReturnType<typeof setTimeout>;
  private heartbeatTimer?: ReturnType<typeof setInterval>;
  private watchdogTimer?: ReturnType<typeof setTimeout>;
  private expiryTimer?: ReturnType<typeof setInterval>;
  private retryAt = 0;
  private lastReceived = 0;
  private latestSnapshotTime = -Infinity;
  private latestServerTime = -Infinity;
  private clockOffset = 0;
  private seen = new Set<string>();
  private desiredView?: PartyViewMapCommandV3;
  private positionTimes = new Map<string, number>();
  private view: PartyRealtimeView = {
    connection: "connecting",
    pings: [],
    positions: [],
    viewMaps: [],
    cooldown: false,
  };

  constructor(
    private options: {
      url: string;
      roomId: string;
      getToken: () => Promise<string | undefined>;
      onChange: (view: PartyRealtimeView) => void;
      onTerminal: (error: PartySocketErrorV3) => void;
    },
  ) {}

  start() {
    this.expiryTimer = setInterval(() => this.expire(), 250);
    void this.connect();
  }
  private emit(patch: Partial<PartyRealtimeView>) {
    this.view = { ...this.view, ...patch };
    if (!this.disposed) this.options.onChange(this.view);
  }
  private clearConnectionTimers() {
    clearInterval(this.heartbeatTimer);
    clearTimeout(this.watchdogTimer);
    this.heartbeatTimer = undefined;
  }
  private serverNow() {
    return Date.now() + this.clockOffset;
  }
  private expire() {
    const now = this.serverNow() / 1000;
    const pings = this.view.pings.filter((e) => e.data.expires_at > now);
    const positions = this.view.positions.filter(
      (e) => e.data.expires_at === null || e.data.expires_at > now,
    );
    const cooldown = Date.now() < this.retryAt;
    if (
      pings.length !== this.view.pings.length ||
      positions.length !== this.view.positions.length ||
      cooldown !== this.view.cooldown
    ) {
      this.emit({
        pings,
        positions,
        cooldown,
        ...(!cooldown && this.view.error?.status === 429
          ? { error: undefined }
          : {}),
      });
    }
  }
  private write(message: object) {
    if (
      this.suspended ||
      this.socket?.readyState !== WebSocket.OPEN ||
      Date.now() < this.retryAt
    )
      return false;
    try {
      this.socket.send(JSON.stringify(message));
      return true;
    } catch {
      return false;
    }
  }
  sync() {
    return this.view.connection === "connected" && this.write({ type: "sync" });
  }
  sendPoint(command: PartyPointCommandV3) {
    if (this.view.connection !== "connected") return false;
    if (!Number.isFinite(command.x) || !Number.isFinite(command.z))
      return false;
    return this.write(command);
  }
  setViewMap(command: PartyViewMapCommandV3 | undefined) {
    const changed =
      command?.map_id !== this.desiredView?.map_id ||
      command?.floor_id !== this.desiredView?.floor_id;
    this.desiredView = command;
    if (changed && command && this.view.connection === "connected")
      this.write(command);
  }
  /** Stop reconnecting before leave; keep the current connection until REST confirms it. */
  suspend() {
    this.suspended = true;
    clearTimeout(this.reconnectTimer);
    this.clearConnectionTimers();
  }
  resume() {
    if (this.disposed) return;
    this.suspended = false;
    this.reconnect();
  }
  reconnect() {
    if (this.disposed || this.suspended || Date.now() < this.retryAt) return;
    clearTimeout(this.reconnectTimer);
    this.generation++;
    this.clearConnectionTimers();
    this.socket?.close();
    this.socket = null;
    void this.connect();
  }
  wake() {
    if (this.disposed || this.suspended) return;
    if (["auth-required", "stopped", "limited"].includes(this.view.connection))
      return;
    if (
      this.view.connection === "connected" &&
      Date.now() - this.lastReceived < 40000
    )
      this.sync();
    else this.reconnect();
  }
  dispose() {
    this.disposed = true;
    this.generation++;
    clearTimeout(this.reconnectTimer);
    clearInterval(this.expiryTimer);
    this.clearConnectionTimers();
    this.socket?.close(1000);
    this.socket = null;
  }
  private schedule() {
    if (this.disposed || this.suspended) return;
    const delay = Math.max(
      this.retryAt - Date.now(),
      Math.min(30000, 1000 * 2 ** Math.min(this.attempts++, 5)) +
        Math.random() * 750,
    );
    clearTimeout(this.reconnectTimer);
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = undefined;
      void this.connect();
    }, delay);
  }
  private async connect() {
    if (this.disposed || this.suspended) return;
    const generation = ++this.generation;
    this.emit({
      connection: this.attempts ? "reconnecting" : "connecting",
      pings: [],
      positions: [],
      viewMaps: [],
    });
    this.seen.clear();
    this.positionTimes.clear();
    this.latestSnapshotTime = -Infinity;
    this.latestServerTime = -Infinity;
    try {
      const token = await this.options.getToken();
      if (generation !== this.generation || this.disposed || this.suspended)
        return;
      if (!token) {
        this.emit({
          connection: "auth-required",
          error: { type: "error", status: 401, msg: "LOGIN_REQUIRED" },
        });
        return;
      }
      const socket = new WebSocket(this.options.url);
      this.socket = socket;
      const current = () => !this.disposed && generation === this.generation;
      this.watchdogTimer = setTimeout(() => {
        if (current()) socket.close();
      }, 20000);
      socket.onopen = () => {
        if (current() && !this.suspended)
          socket.send(JSON.stringify({ type: "auth", token }));
      };
      socket.onmessage = ({ data }) => {
        if (!current() || this.suspended || typeof data !== "string") return;
        try {
          this.receive(JSON.parse(data) as PartySocketEventV3);
        } catch {
          this.emit({
            error: { type: "error", status: 422, msg: "INVALID_MESSAGE" },
            connection: "stopped",
          });
          socket.close(1008);
        }
      };
      socket.onclose = ({ code }) => {
        if (!current()) return;
        this.socket = null;
        this.clearConnectionTimers();
        if (this.suspended) return;
        const error = this.view.error;
        if ([4403, 4404, 4410].includes(code)) {
          const fallback =
            code === 4410
              ? "ROOM_CLOSED"
              : code === 4404
                ? "ROOM_NOT_FOUND"
                : "PARTY_MEMBERSHIP_REQUIRED";
          this.emit({
            connection: "stopped",
            snapshot: undefined,
            pings: [],
            positions: [],
            viewMaps: [],
          });
          this.options.onTerminal(
            error && [403, 404, 410].includes(error.status)
              ? error
              : {
                  type: "error",
                  status: code === 4410 ? 410 : code === 4404 ? 404 : 403,
                  msg: fallback,
                },
          );
          return;
        }
        if ([1008, 1009].includes(code)) {
          this.emit({ connection: "stopped" });
          return;
        }
        if (code === 4401 && this.authAttempts++ >= 1) {
          this.emit({
            connection: "auth-required",
            error:
              error?.status === 401
                ? error
                : { type: "error", status: 401, msg: "LOGIN_REQUIRED" },
          });
          return;
        }
        if (code === 4429) {
          this.retryAt = Math.max(
            this.retryAt,
            Date.now() + (error?.retry_after || 30) * 1000,
          );
          this.emit({ connection: "limited", cooldown: true });
        } else this.emit({ connection: "reconnecting" });
        this.schedule();
      };
      // The close event owns retries (browsers report handshake failures as 1006).
      socket.onerror = () => {};
    } catch {
      if (generation !== this.generation || this.disposed) return;
      this.emit({
        connection: "reconnecting",
        error: {
          type: "error",
          status: 503,
          msg: "PARTY_REALTIME_UNAVAILABLE",
        },
      });
      this.schedule();
    }
  }
  private receive(event: PartySocketEventV3) {
    this.lastReceived = Date.now();
    if (event.type === "error") {
      if (event.status === 429)
        this.retryAt = Date.now() + Math.max(1, event.retry_after || 60) * 1000;
      this.emit({ error: event, cooldown: Date.now() < this.retryAt });
      return;
    }
    if (
      !["snapshot", "ping", "position", "view_map"].includes(event.type) ||
      event.room_id !== this.options.roomId ||
      typeof event.event_id !== "string"
    )
      return;
    const time = eventTime(event.server_time);
    if (!Number.isFinite(time) || this.seen.has(event.event_id)) return;
    this.seen.add(event.event_id);
    if (this.seen.size > 2048)
      this.seen.delete(this.seen.values().next().value!);
    if (time >= this.latestServerTime) {
      this.latestServerTime = time;
      this.clockOffset = time - Date.now();
    }
    if (event.type === "snapshot") {
      if (
        time < this.latestSnapshotTime ||
        event.data.room.id !== this.options.roomId
      )
        return;
      const previous = this.view.snapshot;
      this.latestSnapshotTime = time;
      const members = event.data.members.filter((m) => m.status === "joined");
      const sameMembership = (id: string) =>
        members.some(
          (m) =>
            m.id === id &&
            previous?.members.some(
              (old) =>
                old.id === id &&
                old.joined_at === m.joined_at &&
                old.status === "joined",
            ),
        );
      const positions = event.data.positions.filter(
        (p) =>
          p.type === "position" &&
          p.room_id === event.room_id &&
          members.some((m) => m.id === p.data.member_id) &&
          (p.data.expires_at === null ||
            p.data.expires_at > this.serverNow() / 1000),
      );
      // A delayed snapshot must not replace a position broadcast that is newer.
      for (const p of this.view.positions) {
        if (
          eventTime(p.server_time) > time &&
          sameMembership(p.data.member_id)
        ) {
          const index = positions.findIndex(
            (x) => x.data.member_id === p.data.member_id,
          );
          if (index >= 0) positions.splice(index, 1);
          positions.push(p);
        }
      }
      const viewMaps = (event.data.view_maps ?? []).filter(
        (v) =>
          v.type === "view_map" &&
          v.room_id === event.room_id &&
          members.some((m) => m.id === v.data.member_id),
      );
      for (const v of this.view.viewMaps) {
        if (
          eventTime(v.server_time) > time &&
          sameMembership(v.data.member_id)
        ) {
          const index = viewMaps.findIndex(
            (item) => item.data.member_id === v.data.member_id,
          );
          if (index >= 0) viewMaps.splice(index, 1);
          viewMaps.push(v);
        }
      }
      const shouldReportView =
        this.view.connection !== "connected" ||
        !viewMaps.some((v) => v.data.member_id === event.data.me.id);
      this.positionTimes.clear();
      positions.forEach((p) =>
        this.positionTimes.set(p.data.member_id, eventTime(p.server_time)),
      );
      this.attempts = 0;
      this.authAttempts = 0;
      clearTimeout(this.watchdogTimer);
      if (!this.heartbeatTimer)
        this.heartbeatTimer = setInterval(
          () => {
            if (Date.now() - this.lastReceived > 40000) this.reconnect();
            else this.write({ type: "heartbeat" });
          },
          Math.max(1, Math.min(15, event.data.heartbeat_interval_seconds)) *
            1000,
        );
      this.emit({
        connection: "connected",
        snapshot: event.data,
        positions,
        viewMaps,
        pings: this.view.pings.filter((p) => sameMembership(p.data.member_id)),
        error: Date.now() < this.retryAt ? this.view.error : undefined,
      });
      if (shouldReportView && this.desiredView) this.write(this.desiredView);
      this.expire();
      return;
    }
    const member = this.view.snapshot?.members.find(
      (m) => m.id === event.data.member_id && m.status === "joined",
    );
    if (event.type === "view_map") {
      if (
        !member ||
        time < eventTime(member.joined_at) ||
        time < this.latestSnapshotTime
      )
        return;
      const previous = this.view.viewMaps.find(
        (v) => v.data.member_id === event.data.member_id,
      );
      if (
        previous &&
        (previous.data.membership_epoch !== event.data.membership_epoch ||
          eventTime(previous.server_time) > time)
      )
        return;
      this.emit({
        viewMaps: [
          ...this.view.viewMaps.filter(
            (v) => v.data.member_id !== event.data.member_id,
          ),
          event,
        ],
      });
      return;
    }
    if (
      !member ||
      time < eventTime(member.joined_at) ||
      !Number.isFinite(event.data.x) ||
      !Number.isFinite(event.data.z) ||
      (!(event.type === "position" && event.data.expires_at === null) &&
        (!Number.isFinite(event.data.expires_at) ||
          event.data.expires_at! <= this.serverNow() / 1000))
    )
      return;
    if (event.type === "ping")
      this.emit({ pings: [...this.view.pings, event] });
    else {
      if (
        time <
        Math.max(
          this.latestSnapshotTime,
          this.positionTimes.get(event.data.member_id) ?? -Infinity,
        )
      )
        return;
      const previous = this.view.positions.find(
        (p) => p.data.member_id === event.data.member_id,
      );
      if (
        previous &&
        previous.data.membership_epoch !== event.data.membership_epoch
      )
        return;
      this.positionTimes.set(event.data.member_id, time);
      this.emit({
        positions: [
          ...this.view.positions.filter(
            (p) => p.data.member_id !== event.data.member_id,
          ),
          event,
        ],
      });
    }
  }
}
