"use client";

import {
  cloneElement,
  useId,
  useState,
  type FormEvent,
  type ReactElement,
} from "react";
import type { LiveMapFloor } from "@/types/api/live-map";
import type {
  PartyCreateV3,
  PartyJoinV3,
  PartyMarkerCreateV3,
  PartyMarkerResponseV3,
  PartyMarkerUpdateV3,
  PartyMemberPatchV3,
  PartyRoomPatchV3,
} from "@/types/api/live-map-party";
import type { LiveMapPartyController } from "./use-live-map-party";
import { partyText, type PartyLocale } from "./copy";

export const partyButton =
  "inline-flex shrink-0 whitespace-nowrap min-h-9 items-center justify-center gap-1.5 rounded-md border border-gray-300 px-3 py-1.5 text-xs font-bold text-gray-800 transition hover:bg-orange-50 hover:border-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-[#3a3d41] dark:text-gray-100 dark:hover:bg-[#2a2d31]";
export const partyInput =
  "min-h-9 w-full rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 disabled:opacity-50 dark:border-[#3a3d41] dark:bg-[#15171a] dark:text-gray-100";
export function PartyField({
  label,
  children,
}: {
  label: string;
  children: ReactElement<{ id?: string }>;
}) {
  const id = useId();
  return (
    <div className="grid gap-1 text-xs font-semibold text-gray-600 dark:text-gray-300">
      <label htmlFor={id}>{label}</label>
      {cloneElement(children, { id })}
    </div>
  );
}

export function PartyRoomForm({
  party,
  locale,
  joinId,
  settings = false,
  onDone,
}: {
  party: LiveMapPartyController;
  locale: PartyLocale;
  joinId?: string;
  settings?: boolean;
  onDone: () => void;
}) {
  const t = (ko: string, en: string, ja: string) =>
    partyText(locale, ko, en, ja);
  const room = settings ? party.snapshot?.room : undefined;
  const [name, setName] = useState(room?.name ?? "");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState(party.nickname);
  const [capacity, setCapacity] = useState(room?.max_members ?? 5);
  const [locked, setLocked] = useState(room?.is_locked ?? false);
  async function submit(event: FormEvent) {
    event.preventDefault();
    if ((!joinId && !name.trim()) || (!settings && !password.trim())) return;
    let ok: boolean;
    if (settings && room) {
      const body: PartyRoomPatchV3 = {
        name: name.trim(),
        max_members: capacity,
        is_locked: locked,
        ...(password ? { password } : {}),
      };
      ok = await party.run(`/${room.id}`, "PATCH", body, "snapshot");
    } else if (joinId) {
      const body: PartyJoinV3 = {
        password,
        ...(nickname.trim() ? { nickname: nickname.trim() } : {}),
      };
      ok = await party.run(`/${joinId}/join`, "POST", body, "snapshot");
    } else {
      if (!party.mapId) return;
      const body: PartyCreateV3 = {
        name: name.trim(),
        map_id: party.mapId,
        password,
        max_members: capacity,
        ...(nickname.trim() ? { nickname: nickname.trim() } : {}),
      };
      ok = await party.run("", "POST", body, "snapshot");
    }
    if (ok) {
      setPassword("");
      onDone();
    }
  }
  return (
    <form onSubmit={submit} className="space-y-3">
      <fieldset
        disabled={party.busy || (!!party.roomId && !party.connected)}
        className="space-y-3"
      >
        {!joinId && (
          <PartyField label={t("방 이름", "Room name", "部屋名")}>
            <input
              className={partyInput}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              maxLength={60}
            />
          </PartyField>
        )}
        <PartyField
          label={
            settings
              ? t(
                  "새 비밀번호 (변경할 때만 입력)",
                  "New password (optional)",
                  "新しいパスワード（変更時のみ）",
                )
              : t("비밀번호", "Password", "パスワード")
          }
        >
          <input
            className={partyInput}
            type="password"
            autoComplete={joinId ? "current-password" : "new-password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required={!settings}
            minLength={4}
            maxLength={128}
          />
        </PartyField>
        {!settings && (
          <PartyField
            label={t(
              "파티 닉네임 (선택)",
              "Party nickname (optional)",
              "ニックネーム（任意）",
            )}
          >
            <input
              className={partyInput}
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              maxLength={30}
            />
          </PartyField>
        )}
        {!joinId && (
          <PartyField label={t("정원", "Capacity", "定員")}>
            <input
              className={partyInput}
              type="number"
              min={room?.member_count ?? 1}
              max={10}
              required
              value={capacity}
              onChange={(e) => setCapacity(e.target.valueAsNumber)}
            />
          </PartyField>
        )}
        {settings && (
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={locked}
              onChange={(e) => setLocked(e.target.checked)}
            />
            {t("신규 입장 잠금", "Lock new joins", "新規入室をロック")}
          </label>
        )}
        <div className="flex gap-2">
          <button
            className={partyButton}
            disabled={!party.token || (!joinId && !settings && !party.mapId)}
          >
            {settings
              ? t("저장", "Save", "保存")
              : joinId
                ? t("입장", "Join", "入室")
                : t("방 생성", "Create room", "部屋を作成")}
          </button>
          <button type="button" className={partyButton} onClick={onDone}>
            {t("취소", "Cancel", "キャンセル")}
          </button>
        </div>
      </fieldset>
    </form>
  );
}

export function PartyMemberForm({
  party,
  locale,
}: {
  party: LiveMapPartyController;
  locale: PartyLocale;
}) {
  const me = party.snapshot!.me;
  const [nickname, setNickname] = useState(me.nickname);
  const [color, setColor] = useState(me.color);
  const t = (ko: string, en: string, ja: string) =>
    partyText(locale, ko, en, ja);
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (!nickname.trim()) return;
        const body: PartyMemberPatchV3 = { nickname: nickname.trim(), color };
        await party.run(`/${party.roomId}/members/me`, "PATCH", body);
      }}
    >
      <fieldset
        disabled={party.busy || (!!party.roomId && !party.connected)}
        className="grid grid-cols-[1fr_auto] gap-2"
      >
        <PartyField label={t("내 닉네임", "My nickname", "自分のニックネーム")}>
          <input
            className={partyInput}
            required
            maxLength={30}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </PartyField>
        <PartyField label={t("내 색상", "My color", "自分の色")}>
          <input
            className={`${partyInput} !w-12 !p-1`}
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </PartyField>
        <button className={`${partyButton} col-span-2`}>
          {t("내 정보 저장", "Save my profile", "自分の情報を保存")}
        </button>
      </fieldset>
    </form>
  );
}

export function PartyMarkerForm({
  party,
  locale,
  floors,
  marker,
}: {
  party: LiveMapPartyController;
  locale: PartyLocale;
  floors: LiveMapFloor[];
  marker?: PartyMarkerResponseV3;
}) {
  // Keep the editing version stable while WebSocket snapshots arrive.
  const [initial] = useState(marker);
  const position = party.point ?? marker;
  const [floorId, setFloorId] = useState(position?.floor_id ?? "");
  const [x, setX] = useState(String(position?.x ?? 0));
  const [z, setZ] = useState(String(position?.z ?? 0));
  const [label, setLabel] = useState(marker?.label ?? "");
  const [type, setType] = useState<PartyMarkerCreateV3["marker_type"]>(
    marker?.marker_type ?? "normal",
  );
  const t = (ko: string, en: string, ja: string) =>
    partyText(locale, ko, en, ja);
  return (
    <form
      className="space-y-2"
      onSubmit={async (e) => {
        e.preventDefault();
        if (!Number.isFinite(Number(x)) || !Number.isFinite(Number(z))) return;
        const body: PartyMarkerCreateV3 = {
          floor_id: floorId,
          x: Number(x),
          z: Number(z),
          label,
          marker_type: type,
        };
        if (!initial && party.placementKind !== "marker") {
          const ok = party.sendPoint(
            party.placementKind === "position"
              ? {
                  type: "position",
                  floor_id: floorId,
                  x: Number(x),
                  z: Number(z),
                  request_id: crypto.randomUUID(),
                }
              : { ...body, type: "ping", request_id: crypto.randomUUID() },
          );
          if (ok) party.setPoint(null);
          return;
        }
        const update: PartyMarkerUpdateV3 | undefined = initial
          ? { ...body, version: initial.version }
          : undefined;
        const ok = await party.run(
          `/${party.roomId}/markers${initial ? `/${initial.id}` : ""}`,
          initial ? "PUT" : "POST",
          update ?? body,
        );
        if (ok) {
          party.setPoint(null);
          party.setEditingId(null);
        }
      }}
    >
      <fieldset
        disabled={party.busy || (!!party.roomId && !party.connected)}
        className="space-y-2"
      >
        {!initial && (
          <PartyField label={t("공유 방식", "Share as", "共有方法")}>
            <select
              className={partyInput}
              value={party.placementKind}
              onChange={(e) =>
                party.setPlacementKind(
                  e.target.value as "marker" | "ping" | "position",
                )
              }
            >
              <option value="marker">
                {t("지속 마커", "Persistent marker", "持続マーカー")}
              </option>
              <option value="ping">
                {t("순간 핑 (5초)", "Ping (5s)", "ピン（5秒）")}
              </option>
              <option value="position">
                {t(
                  "내 수동 위치 (60초)",
                  "My manual position (60s)",
                  "自分の手動位置（60秒）",
                )}
              </option>
            </select>
          </PartyField>
        )}

        {(initial || party.placementKind !== "position") && (
          <PartyField label={t("마커 설명", "Marker label", "マーカーの説明")}>
            <input
              className={partyInput}
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              maxLength={100}
            />
          </PartyField>
        )}
        <div className="grid grid-cols-2 gap-2">
          {(initial || party.placementKind !== "position") && (
            <PartyField label={t("종류", "Type", "種類")}>
              <select
                className={partyInput}
                value={type}
                onChange={(e) =>
                  setType(e.target.value as PartyMarkerCreateV3["marker_type"])
                }
              >
                <option value="normal">{t("일반", "Normal", "通常")}</option>
                <option value="danger">{t("위험", "Danger", "危険")}</option>
                <option value="rally">{t("집결", "Rally", "集合")}</option>
                <option value="target">{t("목표", "Target", "目標")}</option>
              </select>
            </PartyField>
          )}
          <PartyField label={t("층", "Floor", "階")}>
            <select
              className={partyInput}
              value={floorId}
              onChange={(e) => setFloorId(e.target.value)}
              required
            >
              {floors.map((f) => (
                <option value={f.id} key={f.id}>
                  {f[`name_${locale}`] ?? f.floor_no}
                </option>
              ))}
            </select>
          </PartyField>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <PartyField label="X">
            <input
              className={partyInput}
              type="number"
              step="any"
              required
              value={x}
              onChange={(e) => setX(e.target.value)}
            />
          </PartyField>
          <PartyField label="Z">
            <input
              className={partyInput}
              type="number"
              step="any"
              required
              value={z}
              onChange={(e) => setZ(e.target.value)}
            />
          </PartyField>
        </div>
        <div className="flex gap-2">
          <button className={partyButton}>
            {!initial && party.placementKind !== "marker"
              ? t("공유하기", "Share", "共有")
              : t("마커 저장", "Save marker", "マーカーを保存")}
          </button>
          <button
            type="button"
            className={partyButton}
            onClick={() => {
              party.setPoint(null);
              party.setEditingId(null);
            }}
          >
            {t("취소", "Cancel", "キャンセル")}
          </button>
        </div>
      </fieldset>
    </form>
  );
}
