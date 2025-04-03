"use client";

import type { ItemClient } from "./itemType";
import Image from "next/image";

export default function ItemClient() {
  const h_data = {
    id: "60bf74184a63fc79b60c57f6",
    name_en: "Bomber beanie",
    name_kr: "Bomber beanie",
    category: "Headwear",
    image: "https://assets.tarkov.dev/60bf74184a63fc79b60c57f6-grid-image.webp",
    image_width: 1,
    image_height: 1,
    info: {
      weight: 0.1,
      areas_en: ["Head, Nape"],
      areas_kr: ["뒷머리", "윗 몸통"],
      material: {
        name: "Aramid",
      },
      deafening: "None",
      durability: 150,
      class_value: 1,
      ergo_penalty: 0,
      turn_penalty: 0,
      speed_penalty: 0,
      ricochet_chance: 0,
      ricochet_str_en: "Low",
      ricochet_str_kr: "낮음",
    },
    url_mapping: "bomber-beanie",
  };
  return (
    <div className="w-full">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="flex flex-col items-center mb-4">
          <div
            style={{
              width: `${180}px`,
              height: `${160}px`,
            }}
            className={`flex justify-center items-center relative`}
          >
            <Image
              src={h_data.image || ""}
              alt={h_data.name_en || ""}
              fill
              sizes={"180"}
              style={{ objectFit: "contain" }}
              placeholder="blur"
              blurDataURL={
                "data:image/jpeg;base64," +
                "iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
              }
            />
          </div>
          <h1 className="text-xl font-bold text-center">{h_data.name_kr}</h1>
        </div>

        <div className="w-full flex flex-col justify-center items-center">
          <div className="flex w-full max-w-2xl">
            <h3 className="text-2xl max-w-2xl font-bold mb-2">정보</h3>
          </div>

          <div className="w-full max-w-2xl border-2 border-white rounded-sm overflow-hidden mb-6">
            <div className="grid grid-cols-2 border-b border-NeutralGray ">
              <div className="py-3 px-4 bg-black text-GoldenYellow font-bold flex justify-center items-center">
                카테고리
              </div>
              <div className="py-3 px-4 bg-black text-center font-bold">
                {h_data.category}
              </div>
            </div>

            <div className="grid grid-cols-2 border-b border-NeutralGray">
              <div className="py-3 px-4 bg-black text-GoldenYellow font-bold flex justify-center items-center">
                보호 등급
              </div>
              <div className="py-3 px-4 bg-black text-center font-bold ">
                {h_data.info.class_value}
              </div>
            </div>

            <div className="grid grid-cols-2 border-b border-NeutralGray">
              <div className="py-3 px-4 bg-black text-GoldenYellow font-bold flex justify-center items-center">
                보호 부위
              </div>
              <div className="flex flex-col w-full">
                {h_data.info.areas_kr.map((area, index) => (
                  <div
                    className="py-3 px-4 bg-black text-center font-bold "
                    key={`area-protect-${area}-${index}`}
                  >
                    {area}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 border-b border-NeutralGray">
              <div className="py-3 px-4 bg-black text-GoldenYellow font-bold flex justify-center items-center">
                재료
              </div>
              <div className="py-3 px-4 bg-black text-center font-bold">
                {h_data.info.material.name}
              </div>
            </div>

            <div className="grid grid-cols-2 border-b border-NeutralGray">
              <div className="py-3 px-4 bg-black text-GoldenYellow font-bold flex justify-center items-center">
                내구성
              </div>
              <div className="py-3 px-4 bg-black text-center font-bold ">
                {h_data.info.durability}
              </div>
            </div>

            <div className="grid grid-cols-2 border-b border-NeutralGray">
              <div className="py-3 px-4 bg-black text-GoldenYellow font-bold flex justify-center items-center">
                도탄 기회
              </div>
              <div className="py-3 px-4 bg-black text-center font-bold ">
                {h_data.info.ricochet_str_kr}
              </div>
            </div>

            <div className="grid grid-cols-2 border-b border-NeutralGray">
              <div className="py-3 px-4 bg-black text-GoldenYellow font-bold flex justify-center items-center">
                무게
              </div>
              <div className="py-3 px-4 bg-black text-center font-bold ">
                {h_data.info.weight} kg
              </div>
            </div>

            <div className="grid grid-cols-2 border-b border-NeutralGray">
              <div className="py-3 px-4 bg-black text-GoldenYellow font-bold flex justify-center items-center">
                인체공학 페널티
              </div>
              <div className="py-3 px-4 bg-black text-center font-bold ">
                {h_data.info.ergo_penalty}
              </div>
            </div>

            <div className="grid grid-cols-2 border-b border-NeutralGray">
              <div className="py-3 px-4 bg-black text-GoldenYellow font-bold flex justify-center items-center">
                이동속도 페널티
              </div>
              <div className="py-3 px-4 bg-black text-center font-bold ">
                {h_data.info.speed_penalty} %
              </div>
            </div>

            <div className="grid grid-cols-2">
              <div className="py-3 px-4 bg-black text-GoldenYellow font-bold flex justify-center items-center">
                회전속도 페널티
              </div>
              <div className="py-3 px-4 bg-black text-center font-bold ">
                {h_data.info.turn_penalty} %
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
