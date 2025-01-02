"use client";

import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import Image from "next/image";

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
  return (
    <div className="w-full">
      {backpackList.map((backpack) => (
        <div
          className="w-full grid grid-cols-5 gap-2 border-solid border-white border-2 mb-4 rounded-lg p-3"
          key={backpack.id}
        >
          <div className="flex justify-center items-center">
            <Gallery>
              <Item original={backpack.image} width="300" height="420">
                {({ ref, open }) => (
                  <Image
                    ref={ref}
                    onClick={open}
                    src={backpack.image}
                    height={0}
                    width={160}
                    style={{ width: "auto", height: "auto" }}
                    alt={backpack.name}
                    priority
                  />
                )}
              </Item>
            </Gallery>
          </div>
          <div className="flex justify-center items-center">
            <span className="text-center font-bold text-lg">
              {backpack.name}
            </span>
          </div>
          <div className="flex justify-center items-center">
            <span className="text-center font-bold text-lg">
              {backpack.capacity}
            </span>
          </div>
          <div className="flex justify-center items-center">
            <span className="text-center font-bold text-lg">
              {backpack.grids[0].width} X {backpack.grids[0].height}
            </span>
          </div>
          <div className="flex justify-center items-center">
            <span className="text-center font-bold text-lg">
              {backpack.weight} kg
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
