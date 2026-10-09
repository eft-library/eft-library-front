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
  "pending" | "accepted" | "rejected" | "revoked" | "expired";

export interface ChatModerationStateV3 {
  is_admin: boolean;
  restricted: boolean;
  reason: string | null;
  expires_at: string | null;
}

export interface PartyNotificationsV3 {
  party_invitation_count: number;
  notification_tab: "party";
}

export interface PartyInvitePreferencesV3 {
  allow_party_invites: boolean;
}

export interface ChatUserActionsV3 {
  user: LiveMapChatUserV3;
  blocked: boolean;
  can_block: boolean;
  can_restrict: boolean;
  can_invite: boolean;
  invite_disabled_reason: string | null;
  retry_after: number | null;
  member_id: string | null;
  can_unkick: boolean;
}

export interface ChatRestrictionDetailV3 {
  user: LiveMapChatUserV3;
  reason: string;
  expires_at: string | null;
  create_time: string;
}

export interface PartyInvitationV3 {
  id: string;
  invitation_id: string;
  notification_tab: "party";
  room_id: string;
  inviter: LiveMapChatUserV3;
  invitee_user_id: string;
  status: PartyInvitationStatusV3;
  status_reason:
    | "cancelled"
    | "room_closed"
    | "room_full"
    | "already_joined"
    | "member_kicked"
    | "receiver_unavailable"
    | null;
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
  online_users?: LiveMapChatUserV3[];
  party_invite_preferences?: PartyInvitePreferencesV3 | null;
  lobby: LiveMapChatMessageV3[];
  party: LiveMapChatMessageV3[];
  party_room_id: string | null;
  lobby_next_before: string | null;
  party_next_before: string | null;
  party_invitations: PartyInvitationV3[];
  heartbeat_interval_seconds: number;
  moderation: ChatModerationStateV3;
  notifications: PartyNotificationsV3;
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
  request_id: string | null;
}

export type LiveMapChatServerEventV3 =
  | {
      type: "party_invite_preferences_updated";
      event_id: string;
      server_time: string;
      data: PartyInvitePreferencesV3;
    }
  | {
      type: "online_users_updated";
      event_id: string;
      server_time: string;
      data: LiveMapChatUserV3[];
    }
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
      data: {
        message_id: string;
        channel: LiveMapChatChannel;
        room_id: string | null;
      };
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
  | {
      type: "chat_moderation_updated";
      event_id: string;
      server_time: string;
      data: ChatModerationStateV3;
    }
  | {
      type: "party_notifications_updated";
      event_id: string;
      server_time: string;
      data: PartyNotificationsV3;
    }
  | LiveMapChatErrorV3;

export type PartyInvitationAcceptResponseV3 = PartySnapshotV3;
