"use client";

import { useSearchParams } from "next/navigation";
import { useScrollMove } from "@/lib/hooks/useScrollMove";
import ImageView from "../../imageView/imageView";

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
  const param = useSearchParams();
  const pageId = param.get("id") || "";
  useScrollMove(pageId, face_cover_data);

  return (
    <div className="w-full">
      {isClass &&
        face_cover_data.class_face_cover.map((faceCover) => (
          <div
            className={`${
              faceCover.id === pageId && "bg-NeutralGray"
            } w-full grid grid-cols-7 gap-2 border-solid border-white border-2 mb-2 rounded-lg p-3`}
            key={faceCover.id}
            id={faceCover.id}
          >
            <div className="flex justify-center items-center">
              <ImageView
                src={faceCover.image}
                alt={faceCover.name}
                popWidth={220}
                popHeight={240}
                wrapWidth={240}
                wrapHeight={100}
                size="240px"
              />
            </div>
            <div className="flex justify-center items-center">
              <span className="text-center font-bold text-sm">
                {faceCover.name}
              </span>
            </div>
            <div className="flex justify-center items-center">
              <span className="text-center font-bold text-sm">
                {faceCover.class_value}
              </span>
            </div>
            <div className="flex flex-col justify-center items-center">
              {faceCover.areas_kr.map((area, index) => (
                <span key={index} className="font-bold text-sm">
                  {area}
                </span>
              ))}
            </div>
            <div className="flex justify-center items-center">
              <span className="text-center font-bold text-sm">
                {faceCover.durability}
              </span>
            </div>
            <div className="flex justify-center items-center">
              <span className="text-center font-bold text-sm">
                {faceCover.ricochet_str_kr}
              </span>
            </div>
            <div className="flex justify-center items-center">
              <span className="text-center font-bold text-sm">
                {faceCover.weight} kg
              </span>
            </div>
          </div>
        ))}
      {!isClass &&
        face_cover_data.no_class_face_cover.map((faceCover) => (
          <div
            className={`${
              faceCover.id === pageId && "bg-NeutralGray"
            } w-full grid grid-cols-2 gap-2 border-solid border-white border-2 mb-2 rounded-lg p-3`}
            key={faceCover.id}
            id={faceCover.id}
          >
            <div className="flex justify-center items-center">
              <ImageView
                src={faceCover.image}
                alt={faceCover.name}
                popWidth={220}
                popHeight={240}
                size="240px"
                wrapWidth={240}
                wrapHeight={100}
              />
            </div>
            <div className="flex justify-center items-center">
              <span className="text-center font-bold text-sm">
                {faceCover.name}
              </span>
            </div>
          </div>
        ))}
    </div>
  );
}
