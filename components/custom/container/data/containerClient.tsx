"use client";

import { useScrollMove } from "@/lib/hooks/useScrollMove";
import { useSearchParams } from "next/navigation";
import ImageView from "../../imageView/imageView";

interface ContainerList {
  containerList: Container[];
}

interface Container {
  id: string;
  name_en: string;
  name_kr: string;
  image: string;
  capacity: number;
  grids: Size[];
}

interface Size {
  width: number;
  height: number;
}

export default function ContainerClient({ containerList }: ContainerList) {
  const param = useSearchParams();
  const pageId = param.get("id") || "";
  useScrollMove(pageId, containerList);

  return (
    <div className="w-full">
      {containerList.map((container) => (
        <div
          className={`${
            container.id === pageId && "bg-NeutralGray"
          } w-full grid grid-cols-4 gap-2 border-solid border-white border-2 mb-2 rounded-lg p-3`}
          key={container.id}
          id={container.id}
        >
          <div className="flex justify-center items-center">
            <ImageView
              src={container.image}
              alt={container.name_en}
              popWidth={260}
              popHeight={200}
              wrapWidth={240}
              wrapHeight={120}
              size="240px"
            />
          </div>
          <div className="flex justify-center items-center">
            <span className="text-center font-bold text-sm">
              {container.name_kr}
            </span>
          </div>
          <div className="flex justify-center items-center">
            <span className="text-center font-bold text-sm">
              {container.capacity}
            </span>
          </div>
          <div className="flex justify-center items-center">
            <span className="text-center font-bold text-sm">
              {container.grids[0].width} X {container.grids[0].height}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
