"use client";

import dynamic from "next/dynamic";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { useLocale } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MapPin, HelpCircle, Search } from "lucide-react";
import { FindLocationTypes, LatLng } from "../map-of-tarkov.types";
import { mapOfTarkovI18n } from "@/lib/consts/i18nConsts";
import FindLocationModal from "./find-location-modal";
import { useWebSocket } from "@/lib/hooks/useWebSocket";
import { wsStore } from "@/store/wsStore";
import { useSession } from "next-auth/react";

const FindLocationInner = dynamic(() => import("./find-location-inner"), {
  ssr: false,
});

export default function FindLocation({ findInfo }: FindLocationTypes) {
  const { location } = wsStore((state) => state);
  const { data: session } = useSession();
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const [popupStatus, setPopupStatus] = useState<boolean>(false);
  const [where, setWhere] = useState<string>("");
  const [isViewWhere, setIsViewWhere] = useState<boolean>(false);
  const [imageCoord, setImageCoord] = useState({ x: 0, y: 0, yaw: 0 });
  const [mousePosition, setMousePosition] = useState<LatLng>({
    lat: 0,
    lng: 0,
  });
  const prevLocationRef = useRef<string | null>(null);

  useWebSocket(session?.accessToken);

  const onClickWhere = () => {
    if (where.length > 0) {
      const splitStr = where.split("]_")[1];

      if (splitStr) {
        const matches = splitStr.match(/[-+]?\d*\.\d+/g);

        if (matches && matches.length >= 7) {
          // 좌표
          const x = parseFloat(matches[0]);
          const y = parseFloat(matches[2]);

          // Quaternion 값
          const qx = parseFloat(matches[3]);
          const qy = parseFloat(matches[4]);
          const qz = parseFloat(matches[5]);
          const qw = parseFloat(matches[6]);

          // Quaternion → Euler 변환 (Tarkov 기준)
          const siny_cosp = 2 * (qw * qy - qz * qx);
          const cosy_cosp = 1 - 2 * (qy * qy + qx * qx);
          let yaw = Math.atan2(siny_cosp, cosy_cosp); // 라디안
          if (yaw < 0) yaw += 2 * Math.PI; // 0~2π 범위로 보정
          const yawDegrees = yaw * (180 / Math.PI); // CSS rotate용 도 단위

          setImageCoord({ x, y, yaw: yawDegrees });
        } else {
          setImageCoord({ x: 0, y: 0, yaw: 0 });
        }

        setIsViewWhere(true);
      } else {
        setImageCoord({ x: 0, y: 0, yaw: 0 });
      }
    }
  };
  // 복사 붙여넣기 전용 함수
  const onClickWhereDirect = (text: string) => {
    if (text.length > 0) {
      const splitStr = text.split("]_")[1];

      if (splitStr) {
        const matches = splitStr.match(/[-+]?\d*\.\d+/g);

        if (matches && matches.length >= 7) {
          // 좌표
          const x = parseFloat(matches[0]);
          const y = parseFloat(matches[2]);

          // Quaternion 값
          const qx = parseFloat(matches[3]);
          const qy = parseFloat(matches[4]);
          const qz = parseFloat(matches[5]);
          const qw = parseFloat(matches[6]);

          // Quaternion → Euler 변환 (Tarkov 기준)
          const siny_cosp = 2 * (qw * qy - qz * qx);
          const cosy_cosp = 1 - 2 * (qy * qy + qx * qx);
          let yaw = Math.atan2(siny_cosp, cosy_cosp); // 라디안
          if (yaw < 0) yaw += 2 * Math.PI; // 0~2π 범위로 보정
          const yawDegrees = yaw * (180 / Math.PI); // CSS rotate용 도 단위

          setImageCoord({ x, y, yaw: yawDegrees });
        } else {
          setImageCoord({ x: 0, y: 0, yaw: 0 });
        }

        setIsViewWhere(true);
      } else {
        setImageCoord({ x: 0, y: 0, yaw: 0 });
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");
    setWhere(pastedText);

    // 상태 반영 기다릴 필요 없이 직접 전달
    setTimeout(() => {
      onClickWhereDirect(pastedText);
    }, 0);
  };

  useEffect(() => {
    if (!location) return;
    if (location === prevLocationRef.current) return;

    prevLocationRef.current = location;
    onClickWhereDirect(location);
  }, [location]);

  return (
    <div className="w-full">
      <div className="container mx-auto px-4 mb-6">
        {/* 제목 */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            <MapPin className="inline mr-2 h-5 w-5 text-orange-600 dark:text-orange-400" />
            {mapOfTarkovI18n.findLocation[localeKey]}
          </h3>
        </div>

        {/* 카드 */}
        <Card className="p-4 bg-white border-gray-200 shadow-sm dark:bg-gray-800/30 dark:border-gray-700/50">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* 좌표 영역 */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    X:
                  </span>
                  <Input
                    type="text"
                    value={mousePosition.lng.toFixed(2)}
                    disabled
                    className="w-20 h-8 text-sm rounded-lg bg-gray-50 border-gray-300 text-gray-900 dark:bg-[#0f1115] dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Z:
                  </span>
                  <Input
                    type="text"
                    value={mousePosition.lat.toFixed(2)}
                    disabled
                    className="w-20 h-8 text-sm rounded-lg bg-gray-50 border-gray-300 text-gray-900 dark:bg-[#0f1115] dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>
            </div>

            {/* 검색 영역 */}
            <div className="flex flex-wrap items-center justify-end gap-2 w-full lg:w-auto lg:ml-auto">
              {/* 도움말 버튼 */}
              <Button
                size="sm"
                variant="outline"
                onClick={() => setPopupStatus(true)}
                className="h-8 w-8 p-0 rounded-full cursor-pointer border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                <HelpCircle className="h-4 w-4" />
              </Button>

              {/* 입력창 */}
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  type="text"
                  value={where}
                  placeholder={mapOfTarkovI18n.pasteValue[localeKey]}
                  onChange={(e) => setWhere(e.currentTarget.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") onClickWhere();
                  }}
                  onPaste={handlePaste}
                  className="pl-8 h-8 w-64 rounded-full bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 dark:bg-[#0f1115] dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                />
              </div>

              {/* 검색 버튼 */}
              <Button
                size="sm"
                onClick={onClickWhere}
                variant="outline"
                className="h-8 bg-transparent rounded-full px-4 border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                Search
              </Button>
            </div>
          </div>
        </Card>

        {/* 지도 */}
        <FindLocationInner
          findInfo={findInfo}
          imageCoord={imageCoord}
          isViewWhere={isViewWhere}
          setMousePosition={setMousePosition}
        />
      </div>

      {/* 모달 */}
      <FindLocationModal isOpen={popupStatus} onClose={setPopupStatus} />
    </div>
  );
}
