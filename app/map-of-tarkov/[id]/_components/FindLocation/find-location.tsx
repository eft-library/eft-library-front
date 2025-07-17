"use client";

import dynamic from "next/dynamic";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { useLocale } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MapPin, HelpCircle, Search } from "lucide-react";
import { useTheme } from "next-themes";
import { FindLocationTypes } from "../map-of-tarkov.types";
import { mapOfTarkovI18n } from "@/lib/consts/i18nConsts";
import FindLocationModal from "./find-location-modal";

const FindLocationInner = dynamic(() => import("./find-location-inner"), {
  ssr: false, // 클라이언트에서만 렌더링
});

export default function FindLocation({ findInfo }: FindLocationTypes) {
  const locale = useLocale();
  const { theme } = useTheme();
  const localeKey = getLocaleKey(locale);
  const [popupStatus, setPopupStatus] = useState<boolean>(false);
  const [where, setWhere] = useState<string>("");
  const [isViewWhere, setIsViewWhere] = useState<boolean>(false);
  const [imageCoord, setImageCoord] = useState({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState<{
    lat: number;
    lng: number;
  }>({ lat: 0, lng: 0 });

  const onClickWhere = () => {
    if (where.length > 0) {
      const splitStr = where.split("]_")[1];

      if (splitStr) {
        const matches = splitStr.match(/[-+]?\d*\.\d+/g);

        if (matches && matches.length >= 3) {
          const x = parseFloat(matches[0]);
          const y = parseFloat(matches[2]);
          setImageCoord({ x: x, y: y });
        } else {
          setImageCoord({ x: 0, y: 0 });
        }

        setIsViewWhere(true);
      } else {
        setImageCoord({ x: 0, y: 0 });
      }
    }
  };

  return (
    <div className="w-full">
      <div className="container mx-auto px-4 mb-6">
        {/* 제목을 상자 밖으로 이동 */}
        <div className="mb-4">
          <h3
            className={`text-xl font-bold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            <MapPin
              className={`inline mr-2 h-5 w-5 ${
                theme === "dark" ? "text-orange-400" : "text-orange-600"
              }`}
            />
            {mapOfTarkovI18n.findLocation[localeKey]}
          </h3>
        </div>

        <Card
          className={`${
            theme === "dark"
              ? "bg-[#1a1c20] border-gray-700"
              : "bg-white border-gray-200 shadow-sm"
          } p-4`}
        >
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Coordinates Section */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <span
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    X:
                  </span>
                  <Input
                    type="text"
                    value={mousePosition.lng.toFixed(2)}
                    disabled
                    className={`w-20 h-8 text-sm rounded-lg ${
                      theme === "dark"
                        ? "bg-[#0f1115] border-gray-600 text-white"
                        : "bg-gray-50 border-gray-300 text-gray-900"
                    }`}
                  />
                </div>
                <div className="flex items-center space-x-1">
                  <span
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Z:
                  </span>
                  <Input
                    type="text"
                    value={mousePosition.lat.toFixed(2)}
                    disabled
                    className={`w-20 h-8 text-sm rounded-lg ${
                      theme === "dark"
                        ? "bg-[#0f1115] border-gray-600 text-white"
                        : "bg-gray-50 border-gray-300 text-gray-900"
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Search Section - Right Aligned */}
            <div className="flex items-center space-x-2 ml-auto">
              {/* Help Button - 간단한 디자인으로 변경 */}
              <Button
                size="sm"
                variant="outline"
                onClick={() => setPopupStatus(true)}
                className={`h-8 w-8 p-0 rounded-full cursor-pointer ${
                  theme === "dark"
                    ? "border-gray-600 text-gray-300 hover:bg-gray-800"
                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                <HelpCircle className="h-4 w-4" />
              </Button>

              {/* Search Input */}
              <div className="relative">
                <Search
                  className={`absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                />
                <Input
                  type="text"
                  value={where}
                  placeholder={mapOfTarkovI18n.pasteValue[localeKey]}
                  onChange={(e) => setWhere(e.currentTarget.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      onClickWhere();
                    }
                  }}
                  className={`pl-8 h-8 w-64 rounded-full ${
                    theme === "dark"
                      ? "bg-[#0f1115] border-gray-600 text-white placeholder-gray-400"
                      : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
                  }`}
                />
              </div>

              {/* Search Button */}
              <Button
                size="sm"
                onClick={() => onClickWhere()}
                className={`h-8 bg-transparent rounded-full px-4 ${
                  theme === "dark"
                    ? "border-gray-600 text-gray-300 hover:bg-gray-800"
                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
                variant="outline"
              >
                Search
              </Button>
            </div>
          </div>
        </Card>
        <FindLocationInner
          findInfo={findInfo}
          imageCoord={imageCoord}
          isViewWhere={isViewWhere}
          setMousePosition={setMousePosition}
        />
      </div>
      <FindLocationModal isOpen={popupStatus} onClose={setPopupStatus} />
    </div>
  );
}
