"use client";

import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import Image from "next/image";
import { useScrollMove } from "@/lib/hooks/useScrollMove";
import { useSearchParams } from "next/navigation";

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
          } w-full grid grid-cols-4 gap-2 border-solid border-white border-2 mb-4 rounded-lg p-3`}
          key={container.id}
          id={container.id}
        >
          <div className="flex justify-center items-center">
            <Gallery>
              <Item original={container.image} width={300} height={240}>
                {({ ref, open }) => (
                  <Image
                    ref={ref}
                    onClick={open}
                    src={container.image}
                    height={0}
                    width={160}
                    style={{ width: "auto", height: "auto" }}
                    alt={container.name_en}
                    priority
                  />
                )}
              </Item>
            </Gallery>
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
