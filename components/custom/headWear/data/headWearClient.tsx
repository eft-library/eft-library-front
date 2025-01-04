"use client";

import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useScrollMove } from "@/lib/hooks/useScrollMove";

interface HeadWearClient {
  headWearData: HeadWearData;
  isClass: boolean;
}

interface HeadWearData {
  class_headwear: DefenseData[];
  no_class_headwear: DefenseData[];
}

interface DefenseData {
  id: string;
  ricochet_str_kr: string;
  durability: number;
  class_value: number;
  areas_kr: string[];
  name: string;
  image: string;
  weight: string;
  blindness_protection: number;
}

export default function HeadWearClient({
  headWearData,
  isClass,
}: HeadWearClient) {
  const param = useSearchParams();
  const pageId = param.get("id") || "";
  useScrollMove(pageId, headWearData);

  return (
    <div className="w-full">
      {isClass &&
        headWearData.class_headwear.map((headWear) => (
          <div
            className={`${
              headWear.id === pageId && "bg-NeutralGray"
            } w-full grid grid-cols-7 gap-2 border-solid border-white border-2 mb-4 rounded-lg p-3`}
            key={headWear.id}
            id={headWear.id}
          >
            <div className="flex justify-center items-center">
              <Gallery>
                <Item original={headWear.image} width="400" height="380">
                  {({ ref, open }) => (
                    <Image
                      ref={ref}
                      onClick={open}
                      src={headWear.image}
                      height={0}
                      width={140}
                      style={{ width: "auto", height: "auto" }}
                      alt={headWear.name}
                      priority
                    />
                  )}
                </Item>
              </Gallery>
            </div>
            <div className="flex justify-center items-center">
              <span className="text-center font-bold text-sm">
                {headWear.name}
              </span>
            </div>
            <div className="flex justify-center items-center">
              <span className="text-center font-bold text-sm">
                {headWear.class_value}
              </span>
            </div>
            <div className="flex flex-col justify-center items-center">
              {headWear.areas_kr.map((area, index) => (
                <span key={index} className="font-bold text-sm">
                  {area}
                </span>
              ))}
            </div>
            <div className="flex justify-center items-center">
              <span className="text-center font-bold text-sm">
                {headWear.durability}
              </span>
            </div>
            <div className="flex justify-center items-center">
              <span className="text-center font-bold text-sm">
                {headWear.ricochet_str_kr}
              </span>
            </div>
            <div className="flex justify-center items-center">
              <span className="text-center font-bold text-sm">
                {headWear.weight} kg
              </span>
            </div>
          </div>
        ))}
      {!isClass &&
        headWearData.no_class_headwear.map((headWear) => (
          <div
            className={`${
              headWear.id === pageId && "bg-NeutralGray"
            } w-full grid grid-cols-2 gap-2 border-solid border-white border-2 mb-4 rounded-lg p-3`}
            key={headWear.id}
            id={headWear.id}
          >
            <div className="flex justify-center items-center">
              <Gallery>
                <Item original={headWear.image} width="200" height="180">
                  {({ ref, open }) => (
                    <Image
                      ref={ref}
                      onClick={open}
                      src={headWear.image}
                      height={0}
                      width={120}
                      style={{ width: "auto", height: "auto" }}
                      alt={headWear.name}
                      priority
                    />
                  )}
                </Item>
              </Gallery>
            </div>
            <div className="flex justify-center items-center">
              <span className="text-center font-bold text-sm">
                {headWear.name}
              </span>
            </div>
          </div>
        ))}
    </div>
  );
}
