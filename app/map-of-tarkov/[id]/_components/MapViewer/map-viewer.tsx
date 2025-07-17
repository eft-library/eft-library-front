"use client";
import { Map } from "lucide-react";
import { useTheme } from "next-themes";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { useLocale } from "next-intl";
import { MapVierwTypes } from "../map-of-tarkov.types";
import { Gallery, Item } from "react-photoswipe-gallery";
import Image from "next/image";

export default function MapViewer({ mapData, imageSelect }: MapVierwTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const { theme } = useTheme();

  return (
    <div className="container mx-auto px-4 mb-8">
      <div className="mb-4">
        <h2
          className={`text-xl md:text-2xl font-bold mb-2 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          <Map
            className={`inline mr-2 h-6 w-6 ${
              theme === "dark" ? "text-orange-400" : "text-orange-600"
            }`}
          />
          {mapData.name[localeKey]}
        </h2>
      </div>

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
                      width={1600}
                      height={900}
                      className="w-full h-auto"
                      priority
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,iVBOR..."
                    />
                  </div>
                )}
              </Item>
            )
        )}
      </Gallery>
    </div>
  );
}
