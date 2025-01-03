"use client";

import GetClientColumn from "../../getColumn/getClientColumn";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import Image from "next/image";

interface Weapon {
  id: string;
  category: string;
  name: string;
  short_name: string;
  image: string;
  update_time: string;
}

interface Knife extends Weapon {
  slash_damage: number;
  hit_radius: number;
  stab_damage: number;
}

interface KnifeRender {
  knifeList: Knife[];
}

export default function KnifeRender({ knifeList }: KnifeRender) {
  const knifeColumn = [
    { name: "사진", colSpan: 1 },
    { name: "이름", colSpan: 1 },
    { name: "기본 데미지", colSpan: 1 },
    { name: "찌르기", colSpan: 1 },
    { name: "기본 공격 범위", colSpan: 1 },
  ];

  return (
    <div className="flex flex-col gap-2 w-full">
      <GetClientColumn columnLength={5} columnList={knifeColumn} />
      {knifeList.map((knife) => (
        <div
          className="w-full grid grid-cols-5 gap-4 border-solid border-white border-2 mb-4 rounded-lg p-3"
          key={knife.id}
        >
          <div className="flex justify-center items-center">
            <Gallery>
              <Item original={knife.image} width="200" height="180">
                {({ ref, open }) => (
                  <Image
                    ref={ref}
                    onClick={open}
                    src={knife.image}
                    height={0}
                    width={120}
                    style={{ width: "auto", height: "auto" }}
                    alt={knife.name}
                    priority
                  />
                )}
              </Item>
            </Gallery>
          </div>
          <div className="flex justify-center items-center">
            <span className="text-center font-bold text-base">
              {knife.name}
            </span>
          </div>
          <div className="flex justify-center items-center">
            <span className="text-center font-bold text-base">
              {knife.slash_damage}
            </span>
          </div>
          <div className="flex justify-center items-center">
            <span className="text-center font-bold text-base">
              {knife.stab_damage}
            </span>
          </div>
          <div className="flex justify-center items-center">
            <span className="text-center font-bold text-base">
              {knife.hit_radius} m
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
