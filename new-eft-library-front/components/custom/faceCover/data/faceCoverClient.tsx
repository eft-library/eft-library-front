"use client";

import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import Image from "next/image";

interface FaceCoverClient {
  face_cover_data: FaceCoverData;
  isClass: boolean;
}

interface FaceCoverData {
  class_face_cover: DefenseData[];
  no_class_face_cover: DefenseData[];
}

interface DefenseData {
  id: string;
  durability: number;
  class_value: number;
  areas_kr: string[];
  weight: number;
  name: string;
  image: string;
  ricochet_str_kr: string;
}

export default function FaceCoverClient({
  face_cover_data,
  isClass,
}: FaceCoverClient) {
  return (
    <div className="w-full">
      {isClass &&
        face_cover_data.class_face_cover.map((faceCover) => (
          <div
            className="w-full grid grid-cols-7 gap-2 border-solid border-white border-2 mb-4 rounded-lg p-3"
            key={faceCover.id}
          >
            <div className="flex justify-center items-center">
              <Gallery>
                <Item original={faceCover.image} width="400" height="380">
                  {({ ref, open }) => (
                    <Image
                      ref={ref}
                      onClick={open}
                      src={faceCover.image}
                      height={0}
                      width={140}
                      style={{ width: "auto", height: "auto" }}
                      alt={faceCover.name}
                      priority
                    />
                  )}
                </Item>
              </Gallery>
            </div>
            <div className="flex justify-center items-center">
              <span className="text-center font-bold text-lg">
                {faceCover.name}
              </span>
            </div>
            <div className="flex justify-center items-center">
              <span className="text-center font-bold text-lg">
                {faceCover.class_value}
              </span>
            </div>
            <div className="flex flex-col justify-center items-center">
              {faceCover.areas_kr.map((area, index) => (
                <span key={index} className="font-bold text-lg">
                  {area}
                </span>
              ))}
            </div>
            <div className="flex justify-center items-center">
              <span className="text-center font-bold text-lg">
                {faceCover.durability}
              </span>
            </div>
            <div className="flex justify-center items-center">
              <span className="text-center font-bold text-lg">
                {faceCover.ricochet_str_kr}
              </span>
            </div>
            <div className="flex justify-center items-center">
              <span className="text-center font-bold text-lg">
                {faceCover.weight} kg
              </span>
            </div>
          </div>
        ))}
      {!isClass &&
        face_cover_data.no_class_face_cover.map((faceCover) => (
          <div
            className="w-full grid grid-cols-2 gap-2 border-solid border-white border-2 mb-4 rounded-lg p-3"
            key={faceCover.id}
          >
            <div className="flex justify-center items-center">
              <Gallery>
                <Item original={faceCover.image} width="200" height="180">
                  {({ ref, open }) => (
                    <Image
                      ref={ref}
                      onClick={open}
                      src={faceCover.image}
                      height={0}
                      width={120}
                      style={{ width: "auto", height: "auto" }}
                      alt={faceCover.name}
                      priority
                    />
                  )}
                </Item>
              </Gallery>
            </div>
            <div className="flex justify-center items-center">
              <span className="text-center font-bold text-lg">
                {faceCover.name}
              </span>
            </div>
          </div>
        ))}
    </div>
  );
}
