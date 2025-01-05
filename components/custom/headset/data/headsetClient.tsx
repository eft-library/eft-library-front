"use client";

import { useSearchParams } from "next/navigation";
import { useScrollMove } from "@/lib/hooks/useScrollMove";
import ImageView from "../../imageView/imageView";

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
            <ImageView
              src={headset.image}
              alt={headset.name}
              popWidth={340}
              popHeight={260}
              size="240px"
              wrapWidth={240}
              wrapHeight={140}
            />
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
