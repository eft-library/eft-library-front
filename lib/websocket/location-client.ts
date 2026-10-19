export type LocationConnectionStatus = "disabled" | "connecting" | "ready" | "reconnecting" | "auth-required";

export interface LocationEventMetadata {
  eventId?: string;
  requestId?: number;
  publishedAt?: number;
  replayed: boolean;
}

/** One cursor across screenshots, log locations, and raid state, retained on reconnect. */
export class LocationEventCursor {
  private ids = new Set<string>();
  private timestamp = -Infinity;

  accept(event: Record<string, unknown>): LocationEventMetadata | null {
    const id = typeof event.event_id === "string" ? event.event_id : undefined;
    const time = typeof event.received_at_unix_us === "number" && Number.isSafeInteger(event.received_at_unix_us) ? event.received_at_unix_us : undefined;
    if ((id && this.ids.has(id)) || (time !== undefined && time < this.timestamp)) return null;
    if (id) this.ids.add(id);
    if (time !== undefined) this.timestamp = time;
    return {
      eventId: id,
      requestId: typeof event.request_id === "number" ? event.request_id : undefined,
      publishedAt: time === undefined ? undefined : time / 1000,
      replayed: event.replayed === true,
    };
  }
}

/** Global location/notification socket; Redis reconnecting does not replace the socket. */
export class LocationRealtimeClient {
  private socket: WebSocket | null = null;
  private disposed = false;
  private generation = 0;
  private attempts = 0;
  private authAttempts = 0;
  private reconnectTimer?: ReturnType<typeof setTimeout>;
  private heartbeat?: ReturnType<typeof setInterval>;
  private connectTimeout?: ReturnType<typeof setTimeout>;
  private authenticating = false;

  constructor(private options: {
    host: string;
    getToken: (forceRefresh?: boolean) => Promise<string | undefined>;
    onStatus: (status: LocationConnectionStatus, connectionId?: string) => void;
    onMessage: (message: Record<string, unknown>) => void;
  }) {}

  start() { void this.connect(); }

  private clearConnectionTimers() {
    clearInterval(this.heartbeat);
    clearTimeout(this.connectTimeout);
  }

  private retry() {
    if (this.disposed || this.reconnectTimer) return;
    this.options.onStatus("reconnecting");
    const delay = Math.min(30000, 1000 * 2 ** Math.min(this.attempts++, 5));
    this.reconnectTimer = setTimeout(() => {
      this.reconnectTimer = undefined;
      void this.connect();
    }, delay * (0.8 + Math.random() * 0.4));
  }

  /** No receive watchdog: the existing server consumes ping without replying. */
  wake() {
    if (this.disposed || this.authenticating || this.reconnectTimer || this.socket?.readyState === WebSocket.OPEN || this.socket?.readyState === WebSocket.CONNECTING) return;
    if (this.authAttempts >= 2) return;
    this.retry();
  }

  reconnect() {
    if (this.disposed) return;
    this.authAttempts = 0;
    this.generation++;
    clearTimeout(this.reconnectTimer);
    this.reconnectTimer = undefined;
    this.clearConnectionTimers();
    this.socket?.close();
    this.socket = null;
    void this.connect();
  }

  private async connect() {
    if (this.disposed) return;
    const generation = ++this.generation;
    this.authenticating = true;
    this.options.onStatus(this.attempts ? "reconnecting" : "connecting");
    let token: string | undefined;
    try {
      token = await this.options.getToken(this.authAttempts > 0);
    } catch {
      if (!this.disposed && generation === this.generation) { this.authenticating = false; this.retry(); }
      return;
    }
    if (this.disposed || generation !== this.generation) return;
    this.authenticating = false;
    if (!token) { this.authAttempts = 2; this.options.onStatus("auth-required"); return; }
    const url = new URL(`wss://${this.options.host}/ws`);
    url.searchParams.set("token", token);
    const socket = new WebSocket(url);
    this.socket = socket;
    this.connectTimeout = setTimeout(() => {
      if (generation !== this.generation) return;
      socket.close();
    }, 15000);
    socket.onopen = () => {
      if (generation !== this.generation || this.disposed) return;
      clearTimeout(this.connectTimeout);
      // Open only means transport connected, not that Redis subscription is ready.
      this.heartbeat = setInterval(() => {
        if (socket.readyState === WebSocket.OPEN) socket.send("ping");
      }, 30000);
    };
    socket.onmessage = ({ data }) => {
      if (generation !== this.generation || this.disposed) return;
      let message: unknown;
      try { message = JSON.parse(String(data)); } catch { return; }
      if (!message || typeof message !== "object" || Array.isArray(message)) return;
      const packet = message as Record<string, unknown>;
      if (packet.type === "location_connection_status") {
        const id = typeof packet.connection_id === "string" ? packet.connection_id : undefined;
        if (packet.status === "ready") {
          this.attempts = 0;
          this.authAttempts = 0;
          this.options.onStatus("ready", id);
        } else if (packet.status === "reconnecting") this.options.onStatus("reconnecting", id);
        return;
      }
      this.options.onMessage(packet);
    };
    socket.onclose = ({ code }) => {
      if (generation !== this.generation || this.disposed) return;
      this.clearConnectionTimers();
      this.socket = null;
      if ([1008, 4401, 4403].includes(code) && ++this.authAttempts >= 2) {
        this.options.onStatus("auth-required");
        return;
      }
      this.retry();
    };
    socket.onerror = () => { if (generation === this.generation && !this.disposed) socket.close(); };
  }

  dispose() {
    this.disposed = true;
    this.generation++;
    clearTimeout(this.reconnectTimer);
    this.clearConnectionTimers();
    this.socket?.close();
    this.socket = null;
  }
}
