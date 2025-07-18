"use client";

import { Separator } from "@/components/ui/separator";
import { Gallery, Item } from "react-photoswipe-gallery";
import Image from "next/image";
import TextSpan from "../../../custom/gridContents/textSpan";
import type { MapInfo } from "./mapOfTarkovType";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { useLocale } from "next-intl";
import { useState } from "react";
import "leaflet/dist/leaflet.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import dynamic from "next/dynamic";
import { mapOfTarkovI18n, findLocationI18N } from "@/lib/consts/i18nConsts";
import { CircleHelp, Search } from "lucide-react";
import DefaultDialog from "@/components/custom/dialog/defaultDialog";

const MapInfoInner = dynamic(() => import("./mapInfoInner"), {
  ssr: false, // 클라이언트에서만 렌더링
});

export default function MapInfo({ mapData, imageSelect, findInfo }: MapInfo) {
  const locale = useLocale();
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
    <div className="w-full flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <TextSpan isCenter={false} size="3xl">
          {mapData.name[localeKey]}
        </TextSpan>
      </div>

      <Separator className="bg-white" />

      <Gallery>
        {mapData.children.map(
          (map) =>
            map.id === imageSelect && (
              <Item
                key={map.id}
                original={map.mot_image[localeKey]}
                width="1600"
                height="900"
              >
                {({ ref, open }) => (
                  <div
                    ref={ref}
                    onClick={open}
                    className="flex justify-center items-center cursor-pointer min-h-[600px] relative"
                  >
                    <Image
                      src={map.mot_image[localeKey]}
                      alt={map.name.en}
                      width={1100}
                      height={600}
                      style={{ width: "auto", height: "auto" }}
                      priority
                      placeholder="blur"
                      blurDataURL={
                        "data:image/jpeg;base64," +
                        "iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
                      }
                    />
                  </div>
                )}
              </Item>
            )
        )}
      </Gallery>

      <TextSpan isCenter={false} size="3xl">
        {mapOfTarkovI18n.findLocation[localeKey]}
      </TextSpan>

      <Separator className="bg-white" />

      <div className="flex justify-between items-center">
        <div className="flex gap-4 border-2 border-white rounded-lg p-2">
          <span className="font-bold">X: {mousePosition.lng.toFixed(2)}</span>
          <br />
          <span className="font-bold">Z: {mousePosition.lat.toFixed(2)}</span>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center justify-center">
            <CircleHelp
              size={32}
              onClick={() => setPopupStatus(true)}
              className="cursor-pointer text-GoldenYellow hover:text-SoftRed"
            />
          </div>

          <Input
            className="text-base font-bold border-white placeholder:text-SilverGray w-[400px] border-2"
            value={where}
            placeholder={mapOfTarkovI18n.pasteValue[localeKey]}
            onChange={(e) => setWhere(e.currentTarget.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onClickWhere();
              }
            }}
          />
          <Button
            onClick={() => onClickWhere()}
            className={
              "rounded-lg font-bold text-base text-white bg-Background border-white border-solid border-2 hover:bg-NeutralGray"
            }
          >
            <Search />
          </Button>
        </div>
      </div>

      <MapInfoInner
        findInfo={findInfo}
        imageCoord={imageCoord}
        isViewWhere={isViewWhere}
        setMousePosition={setMousePosition}
      />

      <DefaultDialog open={popupStatus} setOpen={setPopupStatus} title="Notice">
        <div className="bg-Background p-6 max-h-[800px] overflow-y-auto space-y-6">
          {findLocationI18N.map((info) => (
            <div
              key={info.step}
              className="bg-white/5 rounded-2xl p-4 shadow-md flex flex-col md:flex-row gap-4 items-center"
            >
              <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg">
                {info.step}
              </div>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-4">
                <p className="text-base text-white flex-1">{info[localeKey]}</p>
                {info.img && (
                  <Image
                    src={info.img}
                    alt={info.alt}
                    width={500}
                    height={300}
                    className="rounded-lg w-full max-w-md h-auto"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
                    priority
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </DefaultDialog>
    </div>
  );
}
