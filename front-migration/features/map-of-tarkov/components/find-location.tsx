"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { LatLng } from "leaflet";
import { HelpCircle, MapPin, Search } from "lucide-react";

import type { Locale } from "@/i18n/config";
import type { FindInfo } from "@/types/api/map-of-tarkov";
import { useWsStore } from "@/store/ws-store";

const FindLocationMap = dynamic(
  () => import("./find-location-map").then((mod) => mod.FindLocationMap),
  { ssr: false },
);

const copyByLocale = {
  ko: {
    title: "내 위치 찾기",
    pasteValue: "복사한 값을 입력하세요",
    search: "Search",
    guide: "가이드",
    modalTitle: "내 위치 찾기 가이드",
    autoTitle: "프로그램 사용 시",
    autoSteps: [
      "where-am-i.exe 파일을 실행합니다.",
      "이메일을 입력합니다.",
      "홈페이지에 로그인합니다.",
      "알맞은 지도를 선택한 뒤 스크린샷을 찍습니다.",
      "위치가 자동으로 지도에 표시됩니다.",
    ],
    manualTitle: "프로그램 미사용 시",
    manualSteps: [
      "PrintScreen 키로 스크린샷을 촬영합니다.",
      "스크린샷 파일명을 복사합니다.",
      "위치 확인 입력창에 붙여넣고 Search를 누릅니다.",
    ],
    download: "프로그램 다운로드",
  },
  en: {
    title: "Find My Location",
    pasteValue: "Paste the Copied Value",
    search: "Search",
    guide: "Guide",
    modalTitle: "Location Guide",
    autoTitle: "With Program",
    autoSteps: [
      "Run where-am-i.exe.",
      "Enter your email.",
      "Sign in to the website.",
      "Select the correct map and take a screenshot.",
      "Your location appears automatically.",
    ],
    manualTitle: "Without Program",
    manualSteps: [
      "Take a screenshot with PrintScreen.",
      "Copy the screenshot filename.",
      "Paste it into the location input and press Search.",
    ],
    download: "Download Program",
  },
  ja: {
    title: "私の位置を探す",
    pasteValue: "コピーした値を貼り付けてください",
    search: "Search",
    guide: "ガイド",
    modalTitle: "位置確認ガイド",
    autoTitle: "プログラム使用時",
    autoSteps: [
      "where-am-i.exeを実行します。",
      "メールアドレスを入力します。",
      "サイトにログインします。",
      "正しいマップを選び、スクリーンショットを撮ります。",
      "位置が自動的に表示されます。",
    ],
    manualTitle: "プログラム未使用時",
    manualSteps: [
      "PrintScreenでスクリーンショットを撮影します。",
      "スクリーンショットのファイル名をコピーします。",
      "入力欄に貼り付けてSearchを押します。",
    ],
    download: "プログラムダウンロード",
  },
} as const;

function parseWhereText(text: string) {
  if (!text) {
    return null;
  }

  const splitText = text.split("]_")[1];
  if (!splitText) {
    return null;
  }

  const matches = splitText.match(/[-+]?\d*\.\d+/g);
  if (!matches || matches.length < 7) {
    return null;
  }

  const x = Number.parseFloat(matches[0]);
  const y = Number.parseFloat(matches[2]);
  const qx = Number.parseFloat(matches[3]);
  const qy = Number.parseFloat(matches[4]);
  const qz = Number.parseFloat(matches[5]);
  const qw = Number.parseFloat(matches[6]);

  const sinyCosp = 2 * (qw * qy - qz * qx);
  const cosyCosp = 1 - 2 * (qy * qy + qx * qx);
  let yaw = Math.atan2(sinyCosp, cosyCosp);
  if (yaw < 0) {
    yaw += 2 * Math.PI;
  }

  return { x, y, yaw: (yaw * 180) / Math.PI };
}

export function FindLocation({
  findInfo,
  locale,
}: {
  findInfo: FindInfo;
  locale: Locale;
}) {
  const copy = copyByLocale[locale];
  const websocketLocation = useWsStore((state) => state.location);
  const previousLocationRef = useRef<string | null>(null);
  const [where, setWhere] = useState("");
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isViewWhere, setIsViewWhere] = useState(false);
  const [imageCoord, setImageCoord] = useState({ x: 0, y: 0, yaw: 0 });
  const [mousePosition, setMousePosition] = useState<LatLng | null>(null);

  function applyWhereText(text: string) {
    const result = parseWhereText(text);
    setImageCoord(result ?? { x: 0, y: 0, yaw: 0 });
    setIsViewWhere(Boolean(result));
  }

  function handlePaste(event: React.ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();
    const pastedText = event.clipboardData.getData("text");
    setWhere(pastedText);
    window.setTimeout(() => applyWhereText(pastedText), 0);
  }

  useEffect(() => {
    if (!websocketLocation || websocketLocation === previousLocationRef.current) {
      return;
    }

    previousLocationRef.current = websocketLocation;
    setWhere(websocketLocation);
    applyWhereText(websocketLocation);
  }, [websocketLocation]);

  return (
    <section className="space-y-4">
      <h2 className="flex items-center text-xl font-black">
        <MapPin className="mr-2 h-5 w-5 text-orange-500" />
        {copy.title}
      </h2>
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-[#252830]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              X:
              <input
                value={mousePosition?.lng.toFixed(2) ?? "0.00"}
                disabled
                className="h-8 w-24 rounded-md border border-gray-200 bg-gray-50 px-2 text-sm dark:border-gray-700 dark:bg-[#1e2124]"
              />
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              Z:
              <input
                value={mousePosition?.lat.toFixed(2) ?? "0.00"}
                disabled
                className="h-8 w-24 rounded-md border border-gray-200 bg-gray-50 px-2 text-sm dark:border-gray-700 dark:bg-[#1e2124]"
              />
            </label>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <button
              type="button"
              aria-label={copy.guide}
              onClick={() => setIsGuideOpen(true)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:border-orange-300 hover:text-orange-500 dark:border-gray-700 dark:text-gray-300"
            >
              <HelpCircle className="h-4 w-4" />
            </button>
            <div className="relative min-w-0 sm:w-80">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                value={where}
                onChange={(event) => setWhere(event.currentTarget.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    applyWhereText(where);
                  }
                }}
                onPaste={handlePaste}
                placeholder={copy.pasteValue}
                className="h-9 w-full rounded-full border border-gray-200 bg-gray-50 pl-9 pr-3 text-sm outline-none transition focus:border-orange-400 dark:border-gray-700 dark:bg-[#1e2124]"
              />
            </div>
            <button
              type="button"
              onClick={() => applyWhereText(where)}
              className="h-9 rounded-full border border-gray-200 px-4 text-sm font-semibold transition hover:border-orange-300 hover:text-orange-500 dark:border-gray-700 dark:text-gray-200"
            >
              {copy.search}
            </button>
          </div>
        </div>
        <div className="mt-4 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
          <FindLocationMap
            findInfo={findInfo}
            imageCoord={imageCoord}
            isViewWhere={isViewWhere}
            onMousePositionChange={setMousePosition}
          />
        </div>
      </div>
      <FindLocationGuide
        isOpen={isGuideOpen}
        locale={locale}
        onClose={() => setIsGuideOpen(false)}
      />
    </section>
  );
}

function FindLocationGuide({
  isOpen,
  locale,
  onClose,
}: {
  isOpen: boolean;
  locale: Locale;
  onClose: () => void;
}) {
  const copy = copyByLocale[locale];

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg bg-white p-6 shadow-2xl dark:bg-[#252830]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-4 border-b border-gray-200 pb-4 dark:border-gray-700">
          <h3 className="text-xl font-black">{copy.modalTitle}</h3>
          <button type="button" onClick={onClose} className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-white/10">
            ×
          </button>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <GuideCard title={copy.autoTitle} steps={copy.autoSteps} />
          <GuideCard title={copy.manualTitle} steps={copy.manualSteps} />
        </div>
        <a
          href="https://github.com/eft-library/eft-library-where-am-i/releases/tag/where-am-i"
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex rounded-md bg-orange-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-orange-600"
        >
          {copy.download}
        </a>
      </div>
    </div>
  );
}

function GuideCard({ title, steps }: { title: string; steps: readonly string[] }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-[#1e2124]">
      <h4 className="font-black">{title}</h4>
      <ol className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-300">
        {steps.map((step, index) => (
          <li key={step} className="flex gap-2">
            <span className="font-bold text-orange-500">{index + 1}.</span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
