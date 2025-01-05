"use client";

import { useSearchParams } from "next/navigation";
import { useScrollMove } from "@/lib/hooks/useScrollMove";
import ImageView from "../../imageView/imageView";

interface BackpackList {
  backpackList: Backpack[];
}
interface Backpack {
  name: string;
  image: string;
  id: string;
  capacity: number;
  grids: Size[];
  weight: number;
}
interface Size {
  width: number;
  height: number;
}

export default function BackpackClient({ backpackList }: BackpackList) {
  const param = useSearchParams();
  const pageId = param.get("id") || "";
  useScrollMove(pageId, backpackList);

  return (
    <div className="w-full">
      {backpackList.map((backpack) => (
        <div
          className={`${
            backpack.id === pageId && "bg-NeutralGray"
          } w-full grid grid-cols-5 gap-2 border-solid border-white border-2 mb-2 rounded-lg p-3`}
          key={backpack.id}
          id={backpack.id}
        >
          <div className="flex justify-center items-center">
            <ImageView
              src={backpack.image}
              alt={backpack.name}
              popWidth={300}
              popHeight={400}
              wrapWidth={240}
              wrapHeight={140}
              size="240px"
            />
          </div>
          <div className="flex justify-center items-center">
            <span className="text-center font-bold text-sm">
              {backpack.name}
            </span>
          </div>
          <div className="flex justify-center items-center">
            <span className="text-center font-bold text-sm">
              {backpack.capacity}
            </span>
          </div>
          <div className="flex justify-center items-center">
            <span className="text-center font-bold text-sm">
              {backpack.grids[0].width} X {backpack.grids[0].height}
            </span>
          </div>
          <div className="flex justify-center items-center">
            <span className="text-center font-bold text-sm">
              {backpack.weight} kg
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
