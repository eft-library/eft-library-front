"use client";

import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { Crown, LockKeyhole, MapPin, RefreshCw, Users, X } from "lucide-react";
import type { LiveMapFloor } from "@/types/api/live-map";
import type {
  PartyMarkerResponseV3,
  PartyRoomListV3,
} from "@/types/api/live-map-party";
import { PartyLiveControls } from "./party-live-controls";
import { PartyApiError, partyRequest } from "./api";
import { partyErrorText, partyText, type PartyLocale } from "./copy";
import {
  PartyMarkerForm,
  PartyMemberForm,
  PartyRoomForm,
  partyButton,
  partyInput,
} from "./party-forms";
import type { LiveMapPartyController } from "./use-live-map-party";

export function LiveMapPartyPanel({
  party,
  locale,
  floors,
  activeFloorId,
  mapName,
  onFocus,
  onPlace,
}: {
  party: LiveMapPartyController;
  locale: PartyLocale;
  floors: LiveMapFloor[];
  activeFloorId: string;
  mapName: string;
  onFocus: (marker: PartyMarkerResponseV3) => void;
  onPlace: (kind?: "marker" | "ping" | "position") => void;
}) {
  const t = (ko: string, en: string, ja: string) =>
    partyText(locale, ko, en, ja);
  const [search, setSearch] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const [form, setForm] = useState<"create" | "settings" | string | null>(null);
  const panelRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { open, setOpen, setPlacing } = party;
  const snapshot = party.snapshot;
  const owner = snapshot?.me.role === "owner";
  const params = new URLSearchParams({
    map_id: party.mapId ?? "",
    limit: "20",
    offset: String(offset),
    ...(submittedSearch ? { search: submittedSearch } : {}),
  });
  const rooms = useQuery({
    queryKey: ["live-map-party-rooms", party.mapId, submittedSearch, offset],
    queryFn: ({ signal }) =>
      partyRequest<PartyRoomListV3>(
        `?${params}`,
        undefined,
        "GET",
        undefined,
        signal,
      ),
    enabled: party.open && !!party.mapId && !party.roomId,
    refetchInterval: 15000,
    retry: false,
  });
  useEffect(() => {
    setForm(null);
  }, [party.roomId]);
  useEffect(() => {
    if (!open) return;
    panelRef.current?.focus();
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setPlacing(false);
        buttonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [open, setOpen, setPlacing]);
  const error =
    party.error ?? party.mapError ?? (!party.roomId ? rooms.error : null);
  const selectedMarker = snapshot?.markers.find(
    (m) => m.id === party.editingId,
  );
  const canEdit =
    selectedMarker &&
    (owner || selectedMarker.created_by_member_id === snapshot?.me.id);
  const confirmAction = (
    message: string,
    path: string,
    method: string,
    body?: unknown,
    result: "snapshot" | "leave" | "refresh" = "snapshot",
  ) => {
    if (window.confirm(message)) void party.run(path, method, body, result);
  };
  return (
    <div className="pointer-events-none absolute right-3 top-3 z-[1200] flex max-w-[calc(100%-1.5rem)] flex-col items-end">
      {party.placing && !party.open && (
        <div
          role="status"
          className="pointer-events-auto mb-2 flex max-w-full items-center gap-2 rounded-lg border border-orange-300 bg-white p-3 text-xs text-gray-800 shadow-lg dark:border-orange-800 dark:bg-[#1f2124] dark:text-gray-100"
        >
          <span>
            {t(
              "지도의 빈 곳을 클릭하거나 터치하세요.",
              "Click or tap an empty point on the map.",
              "マップの空いている場所をタップしてください。",
            )}
          </span>
          <button
            className={partyButton}
            onClick={() => party.setPlacing(false)}
          >
            {t("취소", "Cancel", "キャンセル")}
          </button>
        </div>
      )}
      {party.open && (
        <section
          ref={panelRef}
          tabIndex={-1}
          aria-label={t(
            "라이브 맵 파티",
            "Live map party",
            "ライブマップのパーティー",
          )}
          className="pointer-events-auto mb-2 flex max-h-[min(70dvh,42rem)] w-[22rem] max-w-full flex-col overflow-hidden rounded-xl border border-gray-300 bg-white text-gray-900 shadow-xl outline-none dark:border-[#3a3d41] dark:bg-[#1f2124] dark:text-gray-100"
        >
          <header className="flex shrink-0 items-center gap-2 border-b border-gray-200 px-4 py-3 dark:border-[#3a3d41]">
            <Users className="h-4 w-4 text-orange-500" />
            <h2 className="flex-1 font-bold">
              {t("파티", "Party", "パーティー")} · {mapName}
            </h2>
            <button
              type="button"
              className={partyButton}
              aria-label={t("닫기", "Close", "閉じる")}
              onClick={() => {
                party.setOpen(false);
                party.setPlacing(false);
                buttonRef.current?.focus();
              }}
            >
              <X className="h-4 w-4" />
            </button>
          </header>
          <div className="space-y-4 overflow-y-auto overscroll-contain p-4">
            {error && (
              <p
                role="alert"
                className="rounded-md border border-red-300 bg-red-50 p-2 text-xs leading-5 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200"
              >
                {partyErrorText(error, locale)}
              </p>
            )}
            {error instanceof PartyApiError && error.status === 401 && (
              <button
                type="button"
                className={partyButton}
                onClick={() => void signIn("google")}
              >
                {t("다시 로그인", "Sign in again", "再ログイン")}
              </button>
            )}
            {party.roomId && (
              <div
                role="status"
                className="rounded-lg bg-gray-100 p-3 text-xs text-gray-700 dark:bg-[#2a2d31] dark:text-gray-200"
              >
                <p>
                  {party.connected
                    ? t(
                        "실시간 연결됨",
                        "Live connection active",
                        "リアルタイム接続中",
                      )
                    : party.connection === "auth-required"
                      ? t(
                          "로그인이 필요합니다",
                          "Sign-in required",
                          "ログインが必要です",
                        )
                      : party.connection === "limited"
                        ? t(
                            "연결 제한 · 잠시 기다려 주세요",
                            "Connection limit · please wait",
                            "接続制限・しばらくお待ちください",
                          )
                        : party.connection === "stopped"
                          ? t("연결 중단", "Connection stopped", "接続停止")
                          : t(
                              "실시간 서버에 연결 중…",
                              "Connecting to the live server…",
                              "リアルタイムサーバーに接続中…",
                            )}
                </p>
                {party.connected && snapshot && (
                  <p className="mt-1">
                    {t("온라인", "Online", "オンライン")}:{" "}
                    {snapshot.presence.online_count} /{" "}
                    {snapshot.room.member_count}
                  </p>
                )}
                {!party.connected && (
                  <div className="mt-2 flex gap-2">
                    <button
                      className={partyButton}
                      disabled={party.busy}
                      onClick={party.refresh}
                    >
                      {t("다시 연결", "Reconnect", "再接続")}
                    </button>
                    {!snapshot && (
                      <button
                        className={partyButton}
                        disabled={party.busy}
                        onClick={() =>
                          confirmAction(
                            t(
                              "파티에서 나갈까요?",
                              "Leave this party?",
                              "退出しますか？",
                            ),
                            `/${party.roomId}/leave`,
                            "POST",
                            undefined,
                            "leave",
                          )
                        }
                      >
                        {t("퇴장", "Leave", "退出")}
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
            {party.loading && (
              <p role="status" className="text-sm">
                {t(
                  "참여 중인 방을 불러오는 중…",
                  "Restoring your room…",
                  "参加中の部屋を復元中…",
                )}
              </p>
            )}
            {party.roomId && !snapshot && !party.loading && (
              <button
                className={partyButton}
                disabled={party.busy}
                onClick={() => void party.refresh()}
              >
                {t("다시 불러오기", "Retry", "再試行")}
              </button>
            )}
            {!party.roomId && (
              <>
                <p className="text-xs leading-5 text-gray-600 dark:text-gray-300">
                  {t(
                    "현재 맵의 파티에 참여해 마커를 공유하세요. 모든 방은 비밀번호가 필요합니다.",
                    "Join a party on this map to share markers. All rooms require a password.",
                    "このマップのパーティーでマーカーを共有できます。入室にはパスワードが必要です。",
                  )}
                </p>
                {!party.token && (
                  <button
                    type="button"
                    className={`${partyButton} w-full`}
                    disabled={party.status === "loading"}
                    onClick={() => void signIn("google")}
                  >
                    {t(
                      "로그인하고 참여하기",
                      "Sign in to join",
                      "ログインして参加",
                    )}
                  </button>
                )}
                {!form ? (
                  <>
                    <form
                      className="flex gap-2"
                      onSubmit={(e) => {
                        e.preventDefault();
                        setSubmittedSearch(search.trim());
                        setOffset(0);
                      }}
                    >
                      <input
                        aria-label={t(
                          "방 이름 검색",
                          "Search room name",
                          "部屋名を検索",
                        )}
                        placeholder={t(
                          "방 이름 검색",
                          "Search rooms",
                          "部屋を検索",
                        )}
                        className={partyInput}
                        value={search}
                        maxLength={60}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                      <button className={partyButton}>
                        {t("검색", "Search", "検索")}
                      </button>
                    </form>
                    <div className="flex justify-between gap-2">
                      <button
                        className={partyButton}
                        disabled={!party.token || !party.mapId || party.busy}
                        onClick={() => setForm("create")}
                      >
                        {t("방 만들기", "Create room", "部屋を作成")}
                      </button>
                      <button
                        className={partyButton}
                        disabled={rooms.isFetching || party.mapLoading}
                        aria-label={t(
                          "방 목록 새로고침",
                          "Refresh rooms",
                          "部屋一覧を更新",
                        )}
                        onClick={() =>
                          void (party.mapId
                            ? rooms.refetch()
                            : party.retryMap())
                        }
                      >
                        <RefreshCw className="h-4 w-4" />
                      </button>
                    </div>
                    {(rooms.isPending || party.mapLoading) && !error ? (
                      <p role="status" className="text-sm">
                        {t(
                          "방 목록을 불러오는 중…",
                          "Loading rooms…",
                          "部屋一覧を読み込み中…",
                        )}
                      </p>
                    ) : rooms.data?.rooms.length === 0 ? (
                      <p className="rounded-lg bg-gray-100 p-4 text-center text-sm text-gray-600 dark:bg-[#2a2d31] dark:text-gray-300">
                        {t(
                          "검색된 파티가 없습니다. 새 방을 만들어 보세요.",
                          "No rooms found. Create a room to get started.",
                          "部屋がありません。新しい部屋を作成してください。",
                        )}
                      </p>
                    ) : null}
                    <ul className="space-y-2">
                      {rooms.data?.rooms.map((room) => (
                        <li
                          key={room.id}
                          className="rounded-lg border border-gray-200 p-3 dark:border-[#3a3d41]"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <p className="break-words text-sm font-bold">
                                {room.name}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                #{room.id.slice(0, 8)} · {room.member_count}/
                                {room.max_members} {t("참여", "joined", "参加")}
                              </p>
                            </div>
                            <button
                              className={partyButton}
                              disabled={!party.token || party.busy}
                              onClick={() => setForm(room.id)}
                            >
                              {room.is_locked && (
                                <LockKeyhole className="h-3 w-3" />
                              )}
                              {t("입장", "Join", "入室")}
                            </button>
                          </div>
                          {(room.is_locked ||
                            room.member_count >= room.max_members) && (
                            <p className="mt-2 text-xs text-gray-600 dark:text-gray-300">
                              {t(
                                "신규 입장 불가 · 기존 참여자는 복원 가능",
                                "New joins unavailable · members can restore access",
                                "新規入室不可・参加済みの場合は復元可能",
                              )}
                            </p>
                          )}
                        </li>
                      ))}
                    </ul>
                    {rooms.data && rooms.data.total > 20 && (
                      <div className="flex items-center justify-between">
                        <button
                          className={partyButton}
                          disabled={offset === 0 || rooms.isFetching}
                          onClick={() => setOffset((v) => Math.max(0, v - 20))}
                        >
                          {t("이전", "Previous", "前へ")}
                        </button>
                        <span className="text-xs">
                          {offset / 20 + 1} / {Math.ceil(rooms.data.total / 20)}
                        </span>
                        <button
                          className={partyButton}
                          disabled={
                            offset + 20 >= rooms.data.total ||
                            offset >= 10000 ||
                            rooms.isFetching
                          }
                          onClick={() => setOffset((v) => v + 20)}
                        >
                          {t("다음", "Next", "次へ")}
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <PartyRoomForm
                    key={form}
                    party={party}
                    locale={locale}
                    joinId={form === "create" ? undefined : form}
                    onDone={() => setForm(null)}
                  />
                )}
              </>
            )}
            {snapshot && (
              <>
                <div>
                  <h3 className="break-words font-bold">
                    {snapshot.room.name}{" "}
                    <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
                      #{snapshot.room.id.slice(0, 8)}
                    </span>
                  </h3>
                  <p className="mt-1 text-xs text-gray-600 dark:text-gray-300">
                    {snapshot.room.member_count}/{snapshot.room.max_members}{" "}
                    {t("참여 중", "joined", "参加中")}
                    {snapshot.room.is_locked
                      ? ` · ${t("입장 잠김", "Locked", "入室ロック")}`
                      : ""}
                  </p>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {t(
                      "연결 종료 후 유예 시간이 지나면 자동 퇴장됩니다.",
                      "You leave automatically after the reconnection grace period.",
                      "切断後、再接続の猶予時間を過ぎると自動退出します。",
                    )}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    className={partyButton}
                    disabled={party.busy || party.syncing}
                    onClick={() => {
                      party.setError(null);
                      void party.refresh();
                    }}
                  >
                    <RefreshCw className="h-3 w-3" />
                    {t("새로고침", "Refresh", "更新")}
                  </button>
                  {owner && (
                    <button
                      className={partyButton}
                      disabled={party.busy}
                      onClick={() =>
                        setForm(form === "settings" ? null : "settings")
                      }
                    >
                      {t("방 설정", "Room settings", "部屋設定")}
                    </button>
                  )}
                  <button
                    className={partyButton}
                    disabled={party.busy}
                    onClick={() =>
                      confirmAction(
                        t(
                          "파티에서 나갈까요? 마지막 참여자라면 방이 종료됩니다.",
                          "Leave the party? The room closes if you are the last member.",
                          "退出しますか？最後の参加者の場合は部屋が終了します。",
                        ),
                        `/${party.roomId}/leave`,
                        "POST",
                        undefined,
                        "leave",
                      )
                    }
                  >
                    {t("퇴장", "Leave", "退出")}
                  </button>
                </div>
                {owner && form === "settings" && (
                  <>
                    <PartyRoomForm
                      party={party}
                      locale={locale}
                      settings
                      onDone={() => setForm(null)}
                    />
                    <button
                      className={`${partyButton} !text-red-700 dark:!text-red-300`}
                      disabled={party.busy}
                      onClick={() =>
                        confirmAction(
                          t(
                            "모든 참여자의 파티를 종료할까요? 되돌릴 수 없습니다.",
                            "Close this room for everyone? This cannot be undone.",
                            "全員のパーティーを終了しますか？元に戻せません。",
                          ),
                          `/${party.roomId}`,
                          "DELETE",
                          undefined,
                          "leave",
                        )
                      }
                    >
                      {t("파티 종료", "Close room", "パーティー終了")}
                    </button>
                  </>
                )}
                <ul className="space-y-2">
                  {snapshot.members
                    .filter((m) => m.status === "joined")
                    .map((member) => (
                      <li
                        key={member.id}
                        className="flex flex-wrap items-center gap-2 text-xs"
                      >
                        <span
                          aria-hidden="true"
                          className="h-3 w-3 rounded-full border border-gray-500 ring-1 ring-gray-200 dark:ring-[#3a3d41]"
                          style={{
                            backgroundColor: /^#[0-9a-f]{6}$/i.test(
                              member.color,
                            )
                              ? member.color
                              : "#808080",
                          }}
                        />
                        <span className="min-w-0 flex-1 break-words">
                          {member.nickname}
                          <span className="mx-1 inline-block rounded bg-gray-200 px-1 py-0.5 text-[10px] text-gray-700 dark:bg-[#34383e] dark:text-gray-200">
                            {party.connected &&
                            snapshot.presence.online_member_ids.includes(
                              member.id,
                            )
                              ? t("온라인", "Online", "オンライン")
                              : t("오프라인", "Offline", "オフライン")}
                          </span>
                          {member.id === snapshot.me.id
                            ? ` (${t("나", "me", "自分")})`
                            : ""}
                        </span>
                        {member.role === "owner" && (
                          <Crown
                            aria-label={t("방장", "Owner", "リーダー")}
                            className="h-4 w-4 text-orange-600 dark:text-orange-400"
                          />
                        )}
                        {owner && member.id !== snapshot.me.id && (
                          <>
                            <button
                              className={partyButton}
                              disabled={party.busy}
                              aria-label={`${member.nickname} ${t("방장 양도", "transfer ownership", "リーダーを譲る")}`}
                              onClick={() =>
                                confirmAction(
                                  t(
                                    `${member.nickname}님에게 방장을 양도할까요?`,
                                    `Transfer ownership to ${member.nickname}?`,
                                    `${member.nickname}にリーダーを譲りますか？`,
                                  ),
                                  `/${party.roomId}/owner`,
                                  "POST",
                                  { member_id: member.id },
                                )
                              }
                            >
                              {t("양도", "Transfer", "譲渡")}
                            </button>
                            <button
                              className={partyButton}
                              disabled={party.busy}
                              aria-label={`${member.nickname} ${t("강퇴", "kick", "退出させる")}`}
                              onClick={() =>
                                confirmAction(
                                  t(
                                    `${member.nickname}님을 강퇴할까요? 재입장할 수 없습니다.`,
                                    `Remove ${member.nickname}? They cannot rejoin.`,
                                    `${member.nickname}を退出させますか？再入室できなくなります。`,
                                  ),
                                  `/${party.roomId}/members/${member.id}/kick`,
                                  "POST",
                                )
                              }
                            >
                              {t("강퇴", "Kick", "退出")}
                            </button>
                          </>
                        )}
                      </li>
                    ))}
                </ul>
                <details>
                  <summary className="cursor-pointer rounded py-1 text-xs font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500">
                    {t(
                      "내 닉네임·색상 변경",
                      "Edit my nickname/color",
                      "自分の名前・色を変更",
                    )}
                  </summary>
                  <div className="mt-2">
                    <PartyMemberForm
                      key={snapshot.me.id}
                      party={party}
                      locale={locale}
                    />
                  </div>
                </details>
                <PartyLiveControls
                  party={party}
                  locale={locale}
                  floors={floors}
                  activeFloorId={activeFloorId}
                  onPlace={onPlace}
                />
                <div className="border-t border-gray-200 pt-3 dark:border-[#3a3d41]">
                  <h3 className="mb-2 text-sm font-bold">
                    {t("공유 마커", "Shared markers", "共有マーカー")} (
                    {snapshot.markers.length}/200)
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      className={partyButton}
                      disabled={
                        party.busy ||
                        !activeFloorId ||
                        snapshot.markers.length >= 200
                      }
                      aria-pressed={party.placing}
                      onClick={() => {
                        party.setPoint(null);
                        party.setEditingId(null);
                        if (party.placing) party.setPlacing(false);
                        else onPlace("marker");
                      }}
                    >
                      <MapPin className="h-3 w-3" />
                      {party.placing
                        ? t(
                            "위치 선택 취소",
                            "Cancel placement",
                            "位置選択を取消",
                          )
                        : t("지도에 마커 추가", "Place on map", "マップに追加")}
                    </button>
                    <button
                      className={partyButton}
                      disabled={
                        party.busy ||
                        !activeFloorId ||
                        snapshot.markers.length >= 200
                      }
                      onClick={() => {
                        party.setPlacing(false);
                        party.setEditingId(null);
                        party.setPoint({ floor_id: activeFloorId, x: 0, z: 0 });
                      }}
                    >
                      {t("좌표 입력", "Enter coordinates", "座標を入力")}
                    </button>
                  </div>
                  {party.placing && (
                    <p
                      role="status"
                      className="mt-2 text-xs font-semibold text-orange-700 dark:text-orange-300"
                    >
                      {t(
                        "지도의 빈 곳을 클릭하거나 터치하세요.",
                        "Click or tap an empty point on the map.",
                        "マップの空いている場所をタップしてください。",
                      )}
                    </p>
                  )}
                  {(party.point || canEdit) && (
                    <div className="mt-3 rounded-lg border border-orange-300 p-3 dark:border-orange-800">
                      <PartyMarkerForm
                        key={
                          selectedMarker?.id ??
                          `${party.point?.floor_id}:${party.point?.x}:${party.point?.z}`
                        }
                        party={party}
                        locale={locale}
                        floors={floors}
                        marker={canEdit ? selectedMarker : undefined}
                      />
                    </div>
                  )}
                  {selectedMarker && !canEdit && (
                    <p className="mt-2 text-xs text-gray-600 dark:text-gray-300">
                      {t(
                        "작성자와 방장만 수정할 수 있습니다.",
                        "Only the author and owner can edit this marker.",
                        "作成者とリーダーのみ編集できます。",
                      )}
                    </p>
                  )}
                  {snapshot.markers.length === 0 && (
                    <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                      {t(
                        "아직 공유 마커가 없습니다.",
                        "No shared markers yet.",
                        "共有マーカーはまだありません。",
                      )}
                    </p>
                  )}
                  <ul className="mt-3 space-y-2">
                    {snapshot.markers.map((marker) => {
                      const author = snapshot.members.find(
                        (m) => m.id === marker.created_by_member_id,
                      );
                      const editable =
                        owner || marker.created_by_member_id === snapshot.me.id;
                      const floor = floors.find(
                        (f) => f.id === marker.floor_id,
                      );
                      return (
                        <li
                          key={marker.id}
                          className="rounded-md bg-gray-100 p-2 dark:bg-[#2a2d31]"
                        >
                          <button
                            className="w-full break-words rounded text-left text-xs font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                            onClick={() => onFocus(marker)}
                          >
                            {marker.label || t("마커", "Marker", "マーカー")} ·{" "}
                            {t(
                              {
                                normal: "일반",
                                danger: "위험",
                                rally: "집결",
                                target: "목표",
                              }[marker.marker_type],
                              marker.marker_type,
                              {
                                normal: "通常",
                                danger: "危険",
                                rally: "集合",
                                target: "目標",
                              }[marker.marker_type],
                            )}
                            <span className="mt-1 block font-normal text-gray-500 dark:text-gray-400">
                              {author?.nickname ??
                                t(
                                  "이전 참여자",
                                  "Former member",
                                  "以前の参加者",
                                )}{" "}
                              · {floor?.[`name_${locale}`] ?? marker.floor_id}
                            </span>
                          </button>
                          {editable && (
                            <div className="mt-2 flex gap-2">
                              <button
                                className={partyButton}
                                disabled={party.busy}
                                onClick={() => {
                                  party.setPoint(null);
                                  party.setPlacing(false);
                                  party.setEditingId(marker.id);
                                }}
                              >
                                {t("수정", "Edit", "編集")}
                              </button>
                              <button
                                className={partyButton}
                                disabled={party.busy}
                                onClick={() =>
                                  confirmAction(
                                    t(
                                      "공유 마커를 삭제할까요?",
                                      "Delete this shared marker?",
                                      "共有マーカーを削除しますか？",
                                    ),
                                    `/${party.roomId}/markers/${marker.id}?version=${marker.version}`,
                                    "DELETE",
                                    undefined,
                                    "refresh",
                                  )
                                }
                              >
                                {t("삭제", "Delete", "削除")}
                              </button>
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </>
            )}
          </div>
        </section>
      )}
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={party.open}
        onClick={() => party.setOpen(!party.open)}
        className="pointer-events-auto order-first mb-2 inline-flex h-9 w-28 items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-3 text-sm font-bold text-gray-800 shadow-lg transition hover:bg-orange-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 dark:border-[#3a3d41] dark:bg-[#1f2124] dark:text-gray-100 dark:hover:bg-[#2a2d31]"
      >
        <Users className="h-4 w-4 text-orange-600 dark:text-orange-400" />
        {t("파티", "Party", "パーティー")}
        {snapshot && (
          <span className="rounded bg-orange-100 px-1.5 text-xs text-orange-800 dark:bg-orange-950 dark:text-orange-200">
            {snapshot.room.member_count}/{snapshot.room.max_members}
          </span>
        )}
      </button>
    </div>
  );
}
