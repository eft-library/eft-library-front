"use client";
import { Map } from "lucide-react";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { useLocale } from "next-intl";
import type { MapViewTypes } from "../map-of-tarkov.types";
import { Gallery, Item } from "react-photoswipe-gallery";
import Image from "next/image";

export default function MapViewer({ mapData, imageSelect }: MapViewTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  return (
    <div className="container mx-auto px-4 mb-8">
      <div className="mb-4">
        <h2 className="text-xl md:text-2xl font-bold mb-2 text-foreground">
          <Map className="inline mr-2 h-6 w-6 text-primary" />
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
                      src={map.mot_image[localeKey] || "/placeholder.svg"}
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
