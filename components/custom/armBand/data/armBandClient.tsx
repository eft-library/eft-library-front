"use client";

import { useScrollMove } from "@/lib/hooks/useScrollMove";
import { useSearchParams } from "next/navigation";
import ImageView from "../../imageView/imageView";

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
          } w-full grid grid-cols-2 gap-2 border-solid border-white border-2 mb-2 rounded-lg p-3`}
          key={armBand.id}
          id={armBand.id}
        >
          <div className="flex justify-center items-center">
            <ImageView
              src={armBand.image}
              alt={armBand.name}
              popWidth={220}
              popHeight={220}
              wrapWidth={240}
              wrapHeight={100}
              size="240px"
            />
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
