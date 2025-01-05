"use client";

import { useSearchParams } from "next/navigation";
import { useScrollMove } from "@/lib/hooks/useScrollMove";
import ImageView from "../../imageView/imageView";

interface RigClient {
  rig_data: RigData;
  isClass: boolean;
}

interface RigData {
  class_rig: DefenseData[];
  no_class_rig: DefenseData[];
}

interface DefenseData {
  id: string;
  durability: number;
  capacity: number;
  class_value: number;
  areas_kr: string[];
  weight: number;
  name: string;
  image: string;
}

export default function RigClient({ rig_data, isClass }: RigClient) {
  const param = useSearchParams();
  const pageId = param.get("id") || "";
  useScrollMove(pageId, rig_data);

  return (
    <div className="w-full">
      {isClass &&
        rig_data.class_rig.map((rig) => (
          <div
            className={`${
              rig.id === pageId && "bg-NeutralGray"
            } w-full grid grid-cols-7 gap-2 border-solid border-white border-2 mb-2 rounded-lg p-3`}
            key={rig.id}
            id={rig.id}
          >
            <div className="flex justify-center items-center">
              <ImageView
                src={rig.image}
                alt={rig.name}
                popWidth={380}
                popHeight={400}
                size="240px"
                wrapWidth={240}
                wrapHeight={140}
              />
            </div>
            <div className="flex justify-center items-center">
              <span className="text-center font-bold text-sm">{rig.name}</span>
            </div>
            <div className="flex justify-center items-center">
              <span className="text-center font-bold text-sm">
                {rig.durability}
              </span>
            </div>
            <div className="flex justify-center items-center">
              <span className="text-center font-bold text-sm">
                {rig.capacity}
              </span>
            </div>
            <div className="flex justify-center items-center">
              <span className="text-center font-bold text-sm">
                {rig.class_value}
              </span>
            </div>
            <div className="flex flex-col justify-center items-center">
              {rig.areas_kr.map((area, index) => (
                <span key={index} className="font-bold text-sm">
                  {area}
                </span>
              ))}
            </div>
            <div className="flex justify-center items-center">
              <span className="text-center font-bold text-sm">
                {rig.weight} kg
              </span>
            </div>
          </div>
        ))}
      {!isClass &&
        rig_data.no_class_rig.map((rig) => (
          <div
            className={`${
              rig.id === pageId && "bg-NeutralGray"
            } w-full grid grid-cols-4 gap-2 border-solid border-white border-2 mb-2 rounded-lg p-3`}
            key={rig.id}
            id={rig.id}
          >
            <div className="flex justify-center items-center">
              <ImageView
                src={rig.image}
                alt={rig.name}
                popWidth={380}
                popHeight={400}
                size="240px"
                wrapWidth={240}
                wrapHeight={140}
              />
            </div>
            <div className="flex justify-center items-center">
              <span className="text-center font-bold text-sm">{rig.name}</span>
            </div>
            <div className="flex justify-center items-center">
              <span className="text-center font-bold text-sm">
                {rig.capacity}
              </span>
            </div>
            <div className="flex justify-center items-center">
              <span className="text-center font-bold text-sm">
                {rig.weight} kg
              </span>
            </div>
          </div>
        ))}
    </div>
  );
}
