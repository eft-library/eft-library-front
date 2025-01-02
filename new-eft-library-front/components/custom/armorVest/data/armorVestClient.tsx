"use client";

import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import Image from "next/image";

interface DefenseData {
  id: string;
  durability: number;
  class_value: number;
  areas_kr: string[];
  weight: number;
  name: string;
  image: string;
}

interface ArmorVestList {
  armorVestList: DefenseData[];
}

export default function ArmorVestClient({ armorVestList }: ArmorVestList) {
  return (
    <div className="w-full">
      {armorVestList.map((armorVest) => (
        <div
          className="w-full grid grid-cols-6 gap-2 border-solid border-white border-2 mb-4 rounded-lg p-3"
          key={armorVest.id}
        >
          <div className="flex justify-center items-center">
            <Gallery>
              <Item original={armorVest.image} width="300" height="420">
                {({ ref, open }) => (
                  <Image
                    ref={ref}
                    onClick={open}
                    src={armorVest.image}
                    width={140}
                    height={0}
                    priority
                    style={{ width: "auto", height: "auto" }}
                    alt={armorVest.name}
                  />
                )}
              </Item>
            </Gallery>
          </div>
          <div className="flex justify-center items-center">
            <span className="text-center font-bold text-lg">
              {armorVest.name}
            </span>
          </div>
          <div className="flex justify-center items-center">
            <span className="text-center font-bold text-lg">
              {armorVest.durability}
            </span>
          </div>
          <div className="flex justify-center items-center">
            <span className="text-center font-bold text-lg">
              {armorVest.class_value}
            </span>
          </div>
          <div className="flex flex-col justify-center items-center">
            {armorVest.areas_kr.map((area, index) => (
              <span key={index} className="font-bold text-lg">
                {area}
              </span>
            ))}
          </div>
          <div className="flex justify-center items-center">
            <span className="text-center font-bold text-lg">
              {armorVest.weight} kg
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
