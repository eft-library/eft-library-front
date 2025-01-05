"use client";

import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useScrollMove } from "@/lib/hooks/useScrollMove";

interface Headset {
  id: string;
  name: string;
  image: string;
}

interface HeadsetList {
  headsetList: Headset[];
}

export default function HeadsetClient({ headsetList }: HeadsetList) {
  const param = useSearchParams();
  const pageId = param.get("id") || "";
  useScrollMove(pageId, headsetList);

  return (
    <div className="w-full">
      {headsetList.map((headset) => (
        <div
          className={`${
            headset.id === pageId && "bg-NeutralGray"
          } w-full grid grid-cols-2 gap-2 border-solid border-white border-2 mb-2 rounded-lg p-3`}
          key={headset.id}
          id={headset.id}
        >
          <div className="flex justify-center items-center">
            <div className="flex justify-center items-center relative w-[240px] h-[140px]">
              <Gallery>
                <Item original={headset.image} width="340" height="260">
                  {({ ref, open }) => (
                    <Image
                      ref={ref}
                      onClick={open}
                      src={headset.image}
                      fill
                      sizes="240px"
                      style={{ objectFit: "contain" }}
                      alt={headset.name}
                      priority
                    />
                  )}
                </Item>
              </Gallery>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <span className="text-center font-bold text-lg">
              {headset.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
