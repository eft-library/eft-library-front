import type {
  LiveMapChatErrorV3,
  LiveMapChatMessageV3,
  LiveMapChatServerEventV3,
  LiveMapChatSnapshotV3,
  PartyInvitationV3,
} from "@/types/api/live-map-chat";

export type LiveMapChatConnection =
  | "connecting"
  | "connected"
  | "reconnecting"
  | "auth-required"
  | "stopped";

export interface LiveMapChatRealtimeView {
  connection: LiveMapChatConnection;
  snapshot?: LiveMapChatSnapshotV3;
  error?: LiveMapChatErrorV3;
}

function upsertMessage(
  messages: LiveMapChatMessageV3[],
  message: LiveMapChatMessageV3,
) {
  if (messages.some((entry) => entry.id === message.id)) return messages;
  return [message, ...messages].slice(0, 100);
}

function upsertInvitation(
  invitations: PartyInvitationV3[],
  invitation: PartyInvitationV3,
) {
  return [
    invitation,
    ...invitations.filter(
      (entry) => entry.invitation_id !== invitation.invitation_id,
    ),
  ];
}

export class LiveMapChatRealtimeClient {
  private socket: WebSocket | null = null;
  private disposed = false;
  private generation = 0;
  private attempts = 0;
  private reconnectTimer?: ReturnType<typeof setTimeout>;
  private heartbeatTimer?: ReturnType<typeof setInterval>;
  private watchdogTimer?: ReturnType<typeof setTimeout>;
  private view: LiveMapChatRealtimeView = { connection: "connecting" };

  constructor(
    private options: {
      url: string;
      getToken: () => Promise<string | undefined>;
      onChange: (view: LiveMapChatRealtimeView) => void;
    },
  ) {}

  start() {
    void this.connect();
  }

  dispose() {
    this.disposed = true;
    this.generation++;
    clearTimeout(this.reconnectTimer);
    clearInterval(this.heartbeatTimer);
    clearTimeout(this.watchdogTimer);
    this.socket?.close();
    this.socket = null;
  }

  reconnect() {
    if (this.disposed) return;
    this.generation++;
    clearTimeout(this.reconnectTimer);
    clearInterval(this.heartbeatTimer);
    clearTimeout(this.watchdogTimer);
    this.socket?.close();
    this.socket = null;
    void this.connect();
  }

  sendMessage(channel: "lobby" | "party", message: string, roomId?: string) {
    if (this.socket?.readyState !== WebSocket.OPEN) return false;
    this.socket.send(
      JSON.stringify({
        type: "send_message",
        channel,
        message,
        request_id: crypto.randomUUID(),
        ...(channel === "party" ? { room_id: roomId } : {}),
      }),
    );
    return true;
  }

  private emit(patch: Partial<LiveMapChatRealtimeView>) {
    this.view = { ...this.view, ...patch };
    if (!this.disposed) this.options.onChange(this.view);
  }

  private scheduleReconnect(generation: number) {
    if (this.disposed || generation !== this.generation) return;
    this.emit({ connection: "reconnecting" });
    const delay = Math.min(30000, 1000 * 2 ** Math.min(this.attempts++, 5));
    this.reconnectTimer = setTimeout(
      () => void this.connect(),
      delay * (0.8 + Math.random() * 0.4),
    );
  }

  private resetWatchdog(generation: number) {
    clearTimeout(this.watchdogTimer);
    this.watchdogTimer = setTimeout(() => {
      if (generation === this.generation) this.reconnect();
    }, 70000);
  }

  private apply(event: LiveMapChatServerEventV3) {
    if (event.type === "error") {
      this.emit({ error: event });
      return;
    }
    if (event.type === "message_ack") return;
    if (event.type === "snapshot") {
      this.attempts = 0;
      this.emit({ connection: "connected", snapshot: event.data, error: undefined });
      return;
    }
    const snapshot = this.view.snapshot;
    if (!snapshot) return;
    if (event.type === "chat_message") {
      const key = event.data.channel === "lobby" ? "lobby" : "party";
      this.emit({
        snapshot: { ...snapshot, [key]: upsertMessage(snapshot[key], event.data) },
      });
    } else if (
      event.type === "party_invitation_created" ||
      event.type === "party_invitation_updated"
    ) {
      this.emit({
        snapshot: {
          ...snapshot,
          party_invitations: upsertInvitation(
            snapshot.party_invitations,
            event.data,
          ),
        },
      });
    } else if (event.type === "message_deleted") {
      const key = event.data.channel === "lobby" ? "lobby" : "party";
      this.emit({
        snapshot: {
          ...snapshot,
          [key]: snapshot[key].filter(
            (message) => message.id !== event.data.message_id,
          ),
        },
      });
    }
  }

  private async connect() {
    if (this.disposed) return;
    const generation = ++this.generation;
    this.emit({
      connection: this.attempts ? "reconnecting" : "connecting",
      error: undefined,
    });
    const token = await this.options.getToken();
    if (this.disposed || generation !== this.generation) return;
    const socket = new WebSocket(this.options.url);
    this.socket = socket;
    socket.onopen = () => {
      if (generation !== this.generation) return;
      socket.send(JSON.stringify(token ? { type: "auth", token } : { type: "guest" }));
      this.resetWatchdog(generation);
    };
    socket.onmessage = (message) => {
      if (generation !== this.generation) return;
      this.resetWatchdog(generation);
      try {
        const event = JSON.parse(String(message.data)) as LiveMapChatServerEventV3;
        this.apply(event);
        if (event.type === "snapshot") {
          clearInterval(this.heartbeatTimer);
          const seconds = Math.max(15, event.data.heartbeat_interval_seconds || 30);
          this.heartbeatTimer = setInterval(() => {
            if (socket.readyState === WebSocket.OPEN) {
              socket.send(JSON.stringify({ type: "heartbeat" }));
            }
          }, seconds * 1000);
        }
      } catch {
        // Ignore malformed server frames; the server closes repeated violations.
      }
    };
    socket.onclose = (event) => {
      if (generation !== this.generation || this.disposed) return;
      clearInterval(this.heartbeatTimer);
      clearTimeout(this.watchdogTimer);
      this.socket = null;
      if ([4401, 4403].includes(event.code)) {
        this.emit({ connection: "auth-required" });
      } else {
        this.scheduleReconnect(generation);
      }
    };
    socket.onerror = () => socket.close();
  }
}
