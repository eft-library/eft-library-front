"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { getSession, useSession } from "next-auth/react";
import { getApiBaseUrl } from "@/lib/config/app-env";
import type {
  LiveMapChatChannel,
  LiveMapChatMessagesPageV3,
  LiveMapChatMessageV3,
  PartyInvitationAcceptResponseV3,
  PartyInvitationV3,
} from "@/types/api/live-map-chat";
import { liveMapChatRequest, LiveMapChatApiError } from "./api";
import {
  LiveMapChatRealtimeClient,
  type LiveMapChatRealtimeView,
} from "./realtime-client";

function mergeMessages(
  current: LiveMapChatMessageV3[],
  incoming: LiveMapChatMessageV3[],
) {
  const messages = new Map(current.map((message) => [message.id, message]));
  incoming.forEach((message) => messages.set(message.id, message));
  return [...messages.values()].sort((a, b) =>
    b.create_time.localeCompare(a.create_time) || b.id.localeCompare(a.id),
  );
}

function useLiveMapChatState() {
  const { data: session, status } = useSession();
  const token = session?.accessToken;
  const account = session?.userInfo?.email ?? session?.user?.email;
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<LiveMapChatRealtimeView>({
    connection: "auth-required",
  });
  const [older, setOlder] = useState<
    Partial<Record<LiveMapChatChannel, LiveMapChatMessageV3[]>>
  >({});
  const [nextBefore, setNextBefore] = useState<
    Partial<Record<LiveMapChatChannel, string | null>>
  >({});
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const clientRef = useRef<LiveMapChatRealtimeClient | null>(null);

  useEffect(() => {
    setOlder({});
    setNextBefore({});
    setError(null);
    const url = new URL(`${getApiBaseUrl()}/api/live-map/v3/chat/ws`);
    url.protocol = url.protocol === "https:" ? "wss:" : "ws:";
    const client = new LiveMapChatRealtimeClient({
      url: url.toString(),
      getToken: async () => {
        const latest = await getSession();
        const latestAccount =
          latest?.userInfo?.email ?? latest?.user?.email;
        if (!account) return undefined;
        return latestAccount === account ? latest?.accessToken : undefined;
      },
      onChange: setView,
    });
    clientRef.current = client;
    client.start();
    const wake = () => {
      if (document.visibilityState === "visible") client.reconnect();
    };
    window.addEventListener("online", wake);
    document.addEventListener("visibilitychange", wake);
    return () => {
      client.dispose();
      if (clientRef.current === client) clientRef.current = null;
      window.removeEventListener("online", wake);
      document.removeEventListener("visibilitychange", wake);
    };
  }, [account, token]);

  const snapshot = view.snapshot;
  const messages = useMemo(
    () => ({
      lobby: mergeMessages(snapshot?.lobby ?? [], older.lobby ?? []),
      party: mergeMessages(snapshot?.party ?? [], older.party ?? []),
    }),
    [older, snapshot],
  );
  const invitations = useMemo(
    () => snapshot?.party_invitations ?? [],
    [snapshot?.party_invitations],
  );
  const receivedInvitations = useMemo(
    () =>
      invitations.filter(
        (invitation) =>
          invitation.status === "pending" &&
          invitation.invitee_user_id === snapshot?.user?.id,
      ),
    [invitations, snapshot?.user?.id],
  );

  const request = useCallback(
    async <T,>(path: string, method = "GET", body?: unknown) => {
      setBusy(true);
      setError(null);
      try {
        return await liveMapChatRequest<T>(path, token, method, body);
      } catch (failure) {
        const next = failure instanceof Error ? failure : new Error("CHAT_UNAVAILABLE");
        setError(next);
        throw next;
      } finally {
        setBusy(false);
      }
    },
    [token],
  );

  const storeInvitation = useCallback((invitation: PartyInvitationV3) => {
    setView((current) => {
      if (!current.snapshot) return current;
      return {
        ...current,
        snapshot: {
          ...current.snapshot,
          party_invitations: [
            invitation,
            ...current.snapshot.party_invitations.filter(
              (entry) => entry.invitation_id !== invitation.invitation_id,
            ),
          ],
        },
      };
    });
  }, []);

  return {
    open,
    setOpen,
    token,
    authStatus: status,
    connection: view.connection,
    connected: view.connection === "connected",
    error: error ?? (view.error ? new LiveMapChatApiError(view.error.status, view.error.msg, view.error.retry_after ?? 0) : null),
    clearError: () => setError(null),
    busy,
    me: snapshot?.user,
    messages,
    invitations,
    receivedInvitations,
    partyRoomId: snapshot?.party_room_id ?? null,
    nextBefore: {
      lobby: nextBefore.lobby ?? snapshot?.lobby_next_before ?? null,
      party: nextBefore.party ?? snapshot?.party_next_before ?? null,
    },
    sendMessage: (channel: LiveMapChatChannel, message: string, roomId?: string) => {
      setError(null);
      const sent = clientRef.current?.sendMessage(channel, message, roomId) ?? false;
      if (!sent) setError(new LiveMapChatApiError(503, "CHAT_UNAVAILABLE"));
      return sent;
    },
    reconnect: () => clientRef.current?.reconnect(),
    loadLatest: async (channel: LiveMapChatChannel, roomId?: string) => {
      const params = new URLSearchParams({ channel, limit: "50" });
      if (channel === "party" && roomId) params.set("room_id", roomId);
      const page = await request<LiveMapChatMessagesPageV3>(
        `/chat/messages?${params}`,
      );
      setOlder((current) => ({ ...current, [channel]: page.messages }));
      setNextBefore((current) => ({ ...current, [channel]: page.next_before }));
    },
    loadOlder: async (channel: LiveMapChatChannel, roomId?: string) => {
      const cursor = nextBefore[channel] ??
        (channel === "lobby" ? snapshot?.lobby_next_before : snapshot?.party_next_before);
      if (!cursor) return;
      const params = new URLSearchParams({ channel, before: cursor, limit: "50" });
      if (channel === "party" && roomId) params.set("room_id", roomId);
      const page = await request<LiveMapChatMessagesPageV3>(
        `/chat/messages?${params}`,
      );
      setOlder((current) => ({
        ...current,
        [channel]: mergeMessages(current[channel] ?? [], page.messages),
      }));
      setNextBefore((current) => ({ ...current, [channel]: page.next_before }));
    },
    invite: async (roomId: string, inviteeUserId: string) => {
      const invitation = await request<PartyInvitationV3>("/party-invitations", "POST", {
        room_id: roomId,
        invitee_user_id: inviteeUserId,
      });
      storeInvitation(invitation);
      return invitation;
    },
    acceptInvitation: (id: string) =>
      request<PartyInvitationAcceptResponseV3>(
        `/party-invitations/${encodeURIComponent(id)}/accept`,
        "POST",
      ),
    rejectInvitation: async (id: string) => {
      const invitation = await request<PartyInvitationV3>(
        `/party-invitations/${encodeURIComponent(id)}/reject`,
        "POST",
      );
      storeInvitation(invitation);
      return invitation;
    },
    revokeInvitation: async (id: string) => {
      const invitation = await request<PartyInvitationV3>(
        `/party-invitations/${encodeURIComponent(id)}`,
        "DELETE",
      );
      storeInvitation(invitation);
      return invitation;
    },
    blockUser: async (userId: string) => {
      const result = await request<{ user_id: string; blocked: boolean }>(
        `/chat/blocks/${encodeURIComponent(userId)}`,
        "POST",
      );
      setView((current) => {
        if (!current.snapshot) return current;
        return {
          ...current,
          snapshot: {
            ...current.snapshot,
            lobby: current.snapshot.lobby.filter(
              (message) => message.user.id !== userId,
            ),
            party: current.snapshot.party.filter(
              (message) => message.user.id !== userId,
            ),
          },
        };
      });
      setOlder((current) => ({
        lobby: current.lobby?.filter((message) => message.user.id !== userId),
        party: current.party?.filter((message) => message.user.id !== userId),
      }));
      return result;
    },
    reportMessage: (
      messageId: string,
      reason: "spam" | "abuse" | "inappropriate" | "personal_info" | "other",
      detail?: string,
    ) =>
      request<{ id: string }>(
        `/chat/messages/${encodeURIComponent(messageId)}/report`,
        "POST",
        { reason, ...(detail?.trim() ? { detail: detail.trim() } : {}) },
      ),
  };
}

const LiveMapChatContext = createContext<ReturnType<typeof useLiveMapChatState> | null>(null);

export function LiveMapChatProvider({ children }: { children: ReactNode }) {
  const value = useLiveMapChatState();
  return <LiveMapChatContext.Provider value={value}>{children}</LiveMapChatContext.Provider>;
}

export function useLiveMapChat() {
  const value = useContext(LiveMapChatContext);
  if (!value) throw new Error("LiveMapChatProvider is missing");
  return value;
}
