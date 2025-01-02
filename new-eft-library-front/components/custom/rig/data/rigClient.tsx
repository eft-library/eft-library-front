"use client";

import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import Image from "next/image";

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
  return (
    <div className="w-full">
      {isClass &&
        rig_data.class_rig.map((rig) => (
          <div
            className="w-full grid grid-cols-7 gap-2 border-solid border-white border-2 mb-4 rounded-lg p-3"
            key={rig.id}
          >
            <div className="flex justify-center items-center">
              <Gallery>
                <Item original={rig.image} width="400" height="380">
                  {({ ref, open }) => (
                    <Image
                      ref={ref}
                      onClick={open}
                      src={rig.image}
                      height={0}
                      width={140}
                      style={{ width: "auto", height: "auto" }}
                      alt={rig.name}
                      priority
                    />
                  )}
                </Item>
              </Gallery>
            </div>
            <div className="flex justify-center items-center">
              <span className="text-center font-bold text-lg">{rig.name}</span>
            </div>
            <div className="flex justify-center items-center">
              <span className="text-center font-bold text-lg">
                {rig.durability}
              </span>
            </div>
            <div className="flex justify-center items-center">
              <span className="text-center font-bold text-lg">
                {rig.capacity}
              </span>
            </div>
            <div className="flex justify-center items-center">
              <span className="text-center font-bold text-lg">
                {rig.class_value}
              </span>
            </div>
            <div className="flex flex-col justify-center">
              {rig.areas_kr.map((area, index) => (
                <span key={index} className="font-bold text-lg">
                  {area}
                </span>
              ))}
            </div>
            <div className="flex justify-center items-center">
              <span className="text-center font-bold text-lg">
                {rig.weight} kg
              </span>
            </div>
          </div>
        ))}
      {!isClass &&
        rig_data.no_class_rig.map((rig) => (
          <div
            className="w-full grid grid-cols-4 gap-2 border-solid border-white border-2 mb-4 rounded-lg p-3"
            key={rig.id}
          >
            <div className="flex justify-center items-center">
              <Gallery>
                <Item original={rig.image} width="400" height="380">
                  {({ ref, open }) => (
                    <Image
                      ref={ref}
                      onClick={open}
                      src={rig.image}
                      height={0}
                      width={140}
                      style={{ width: "auto", height: "auto" }}
                      alt={rig.name}
                      priority
                    />
                  )}
                </Item>
              </Gallery>
            </div>
            <div className="flex justify-center items-center">
              <span className="text-center font-bold text-lg">{rig.name}</span>
            </div>
            <div className="flex justify-center items-center">
              <span className="text-center font-bold text-lg">
                {rig.capacity}
              </span>
            </div>
            <div className="flex justify-center items-center">
              <span className="text-center font-bold text-lg">
                {rig.weight} kg
              </span>
            </div>
          </div>
        ))}
    </div>
  );
}
