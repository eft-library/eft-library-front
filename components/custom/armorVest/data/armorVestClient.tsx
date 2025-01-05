"use client";

import { useSearchParams } from "next/navigation";
import { useScrollMove } from "@/lib/hooks/useScrollMove";
import ImageView from "../../imageView/imageView";

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
  const param = useSearchParams();
  const pageId = param.get("id") || "";
  useScrollMove(pageId, armorVestList);

  return (
    <div className="w-full">
      {armorVestList.map((armorVest) => (
        <div
          className={`${
            armorVest.id === pageId && "bg-NeutralGray"
          } w-full grid grid-cols-6 gap-2 border-solid border-white border-2 mb-2 rounded-lg p-3`}
          key={armorVest.id}
          id={armorVest.id}
        >
          <div className="flex justify-center items-center">
            <ImageView
              src={armorVest.image}
              alt={armorVest.name}
              popWidth={300}
              popHeight={380}
              wrapWidth={240}
              wrapHeight={140}
              size="240px"
            />
          </div>
          <div className="flex justify-center items-center">
            <span className="text-center font-bold text-sm">
              {armorVest.name}
            </span>
          </div>
          <div className="flex justify-center items-center">
            <span className="text-center font-bold text-sm">
              {armorVest.durability}
            </span>
          </div>
          <div className="flex justify-center items-center">
            <span className="text-center font-bold text-sm">
              {armorVest.class_value}
            </span>
          </div>
          <div className="flex flex-col justify-center items-center">
            {armorVest.areas_kr.map((area, index) => (
              <span key={index} className="font-bold text-sm">
                {area}
              </span>
            ))}
          </div>
          <div className="flex justify-center items-center">
            <span className="text-center font-bold text-sm">
              {armorVest.weight} kg
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
