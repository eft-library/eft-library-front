// Derived from the deployed FastAPI V3 OpenAPI contract.
export interface PartyRoomResponseV3 {
  id: string;
  name: string;
  map_id: string;
  is_locked: boolean;
  max_members: number;
  member_count: number;
  create_time: string;
  update_time: string;
}

export interface PartyMemberResponseV3 {
  id: string;
  nickname: string;
  color: string;
  role: "owner" | "member";
  status: "joined" | "left" | "kicked";
  joined_at: string;
}

export interface PartyMarkerResponseV3 {
  id: string;
  room_id: string;
  created_by_member_id: string;
  floor_id: string;
  x: number;
  z: number;
  marker_type: "normal" | "danger" | "rally" | "target";
  label: string | null;
  version: number;
  create_time: string;
  update_time: string;
}

export interface PartySnapshotV3 {
  room: PartyRoomResponseV3;
  me: PartyMemberResponseV3;
  members: PartyMemberResponseV3[];
  markers: PartyMarkerResponseV3[];
}

export interface PartyRoomListV3 {
  rooms: PartyRoomResponseV3[];
  total: number;
  limit: number;
  offset: number;
}

export interface PartyCreateV3 {
  name: string;
  map_id: string;
  password: string;
  nickname?: string | null;
  max_members?: number;
}

export interface PartyJoinV3 {
  password: string;
  nickname?: string | null;
}

export interface PartyRoomPatchV3 {
  name?: string | null;
  password?: string | null;
  is_locked?: boolean | null;
  max_members?: number | null;
}

export interface PartyMemberPatchV3 {
  nickname?: string | null;
  color?: string | null;
}

export interface PartyMarkerCreateV3 {
  floor_id: string;
  x: number;
  z: number;
  marker_type?: "normal" | "danger" | "rally" | "target";
  label?: string | null;
}

export interface PartyMarkerUpdateV3 {
  floor_id: string;
  x: number;
  z: number;
  marker_type?: "normal" | "danger" | "rally" | "target";
  label?: string | null;
  version: number;
}

export interface PartyLeaveResponseV3 {
  room_id: string;
  closed: boolean;
  owner_member_id: string | null;
}

// WebSocket contract: backend docs/live_map_party_v3_websocket.md.
export interface PartyTemporaryPointV3 {
  member_id: string;
  membership_epoch: string;
  nickname: string;
  color: string;
  floor_id: string;
  x: number;
  z: number;
  map_id?: string;
  expires_at: number;
  request_id?: string;
}

export interface PartyEventV3<T extends string, D> {
  type: T;
  event_id: string;
  room_id: string;
  server_time: string;
  data: D;
}
export type PartyPositionEventV3 = PartyEventV3<
  "position",
  Omit<PartyTemporaryPointV3, "expires_at"> & {
    yaw?: number;
    expires_at: number | null;
  }
>;
export type PartyPingEventV3 = PartyEventV3<
  "ping",
  PartyTemporaryPointV3 & {
    marker_type: PartyMarkerResponseV3["marker_type"];
    label?: string;
  }
>;
export interface PartyViewMapCommandV3 {
  type: "view_map";
  map_id: string;
  floor_id: string;
}
export interface PartyMapNameV3 {
  id: string;
  name_ko: string | null;
  name_en: string | null;
  name_ja: string | null;
}
export type PartyViewMapEventV3 = PartyEventV3<
  "view_map",
  {
    member_id: string;
    membership_epoch: string;
    nickname: string;
    color: string;
    map_id: string;
    floor_id: string;
    map: PartyMapNameV3;
    floor: PartyMapNameV3 & { map_id: string; floor_no: number | null };
  }
>;
export interface PartyRealtimeSnapshotV3 extends PartySnapshotV3 {
  presence: { online_member_ids: string[]; online_count: number };
  positions: PartyPositionEventV3[];
  view_maps: PartyViewMapEventV3[];
  heartbeat_interval_seconds: number;
  reconnect_grace_seconds: number;
  reason: "connected" | "changed" | "heartbeat" | "sync";
}
export type PartySnapshotEventV3 = PartyEventV3<
  "snapshot",
  PartyRealtimeSnapshotV3
>;
export interface PartySocketErrorV3 {
  type: "error";
  status: number;
  msg: string;
  retry_after?: number;
}
export type PartySocketEventV3 =
  | PartySnapshotEventV3
  | PartyPingEventV3
  | PartyPositionEventV3
  | PartyViewMapEventV3
  | PartySocketErrorV3;
export type PartyPointCommandV3 =
  | ({
      type: "ping";
      map_id?: string;
      request_id?: string;
    } & PartyMarkerCreateV3)
  | {
      type: "position";
      map_id?: string;
      floor_id: string;
      x: number;
      z: number;
      yaw?: number;
      persistent?: boolean;
      request_id?: string;
    };
