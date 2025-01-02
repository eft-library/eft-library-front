"use client";

import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import Image from "next/image";

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
  return (
    <div className="w-full">
      {armBandList.map((armBand) => (
        <div
          className="w-full grid grid-cols-2 gap-2 border-solid border-white border-2 mb-4 rounded-lg p-3"
          key={armBand.id}
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
                    width={110}
                    style={{ width: "auto", height: "auto" }}
                    alt={armBand.name}
                    priority
                  />
                )}
              </Item>
            </Gallery>
          </div>
          <div className="flex justify-center items-center">
            <span className="text-center font-bold text-lg">
              {armBand.name}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
