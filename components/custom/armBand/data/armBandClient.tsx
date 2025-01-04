"use client";

import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import Image from "next/image";
import { useScrollMove } from "@/lib/hooks/useScrollMove";
import { useSearchParams } from "next/navigation";

interface ArmBand {
  id: string;
  name: string;
  short_name: string;
  weight: string;
  image: string;
}

interface ArmBandList {
  armBandList: ArmBand[];
}

export default function ArmBandClient({ armBandList }: ArmBandList) {
  const param = useSearchParams();
  const pageId = param.get("id") || "";
  useScrollMove(pageId, armBandList);

  return (
    <div className="w-full">
      {armBandList.map((armBand) => (
        <div
          className={`${
            armBand.id === pageId && "bg-NeutralGray"
          } w-full grid grid-cols-2 gap-2 border-solid border-white border-2 mb-4 rounded-lg p-3`}
          key={armBand.id}
          id={armBand.id}
        >
          <div className="flex justify-center items-center">
            <Gallery>
              <Item original={armBand.image} width="200" height="180">
                {({ ref, open }) => (
                  <Image
                    ref={ref}
                    onClick={open}
                    src={armBand.image}
                    height={0}
                    width={120}
                    style={{ width: "auto", height: "auto" }}
                    alt={armBand.name}
                    priority
                  />
                )}
              </Item>
            </Gallery>
          </div>
          <div className="flex justify-center items-center">
            <span className="text-center font-bold text-sm">
              {armBand.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
