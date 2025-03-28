"use client";

import { Separator } from "@/components/ui/separator";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import { formatImage } from "@/lib/func/formatImage";
import Image from "next/image";
import TextSpan from "../../../custom/gridContents/textSpan";
import type { MapSlider } from "./mapOfTarkovType";

export default function MapSlider({ mapInfo, imageSelect }: MapSlider) {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <TextSpan isCenter={false} size="3xl">
          {mapInfo.name_kr}
        </TextSpan>
      </div>
      <Separator className="bg-white" />
      <Gallery>
        {mapInfo.sub.map(
          (map) =>
            map.id === imageSelect && (
              <Item
                key={map.id}
                original={formatImage(map.mot_image)}
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
                      src={formatImage(map.mot_image)}
                      alt={map.name_en}
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
    </div>
  );
}
