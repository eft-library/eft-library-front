import type { PartySnapshotV3 } from "./live-map-party";

export type LiveMapChatChannel = "lobby" | "party";

export interface LiveMapChatUserV3 {
  id: string;
  nickname: string;
}

export interface LiveMapChatMessageV3 {
  id: string;
  channel: LiveMapChatChannel;
  room_id: string | null;
  user: LiveMapChatUserV3;
  message: string;
  create_time: string;
}

export type PartyInvitationStatusV3 =
  | "pending"
  | "accepted"
  | "rejected"
  | "revoked"
  | "expired";

export interface PartyInvitationV3 {
  id: string;
  invitation_id: string;
  room_id: string;
  inviter: LiveMapChatUserV3;
  invitee_user_id: string;
  status: PartyInvitationStatusV3;
  expires_at: string;
  party: {
    id: string;
    name: string;
    member_count: number;
    max_members: number;
    is_locked: boolean;
    closed: boolean;
    can_join: boolean;
  };
}

export interface LiveMapChatSnapshotV3 {
  user: LiveMapChatUserV3 | null;
  lobby: LiveMapChatMessageV3[];
  party: LiveMapChatMessageV3[];
  party_room_id: string | null;
  lobby_next_before: string | null;
  party_next_before: string | null;
  party_invitations: PartyInvitationV3[];
  heartbeat_interval_seconds: number;
}

export interface LiveMapChatMessagesPageV3 {
  messages: LiveMapChatMessageV3[];
  next_before: string | null;
}

export interface LiveMapChatErrorV3 {
  type: "error";
  status: number;
  msg: string;
  retry_after: number | null;
}

export type LiveMapChatServerEventV3 =
  | {
      type: "snapshot";
      event_id: string;
      server_time: string;
      data: LiveMapChatSnapshotV3;
    }
  | {
      type: "chat_message";
      event_id: string;
      server_time: string;
      data: LiveMapChatMessageV3;
    }
  | {
      type: "party_invitation_created" | "party_invitation_updated";
      event_id: string;
      server_time: string;
      data: PartyInvitationV3;
    }
  | {
      type: "message_deleted";
      event_id: string;
      server_time: string;
      data: { message_id: string; channel: LiveMapChatChannel; room_id: string | null };
    }
  | {
      type: "message_ack";
      event_id?: string;
      server_time?: string;
      data: {
        message_id: string;
        request_id: string;
        duplicate: boolean;
        realtime_available: boolean;
      };
    }
  | LiveMapChatErrorV3;

export type PartyInvitationAcceptResponseV3 = PartySnapshotV3;
