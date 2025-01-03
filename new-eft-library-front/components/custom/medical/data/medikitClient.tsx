"use client";

import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import Image from "next/image";
import { useAppStore } from "@/store/provider";

interface MediKitClient {
  medicalList: MediKit[];
}

interface MediKit {
  id: string;
  category: string;
  name_kr: string;
  name_en: string;
  image: string;
  short_name: string;
  cures_en: string[];
  cures_kr: string[];
  buff: Effect[];
  debuff: Effect[];
  use_time: number;
  uses: number;
  energy_impact: number;
  hydration_impact: number;
  painkiller_duration: number;
  hitpoints: number;
}
interface Effect {
  type: string;
  delay: number;
  value: number;
  chance: number;
  krSkill: string;
  duration: number;
  skillName: string;
}

export default function MediKitClient({ medicalList }: MediKitClient) {
  const { medicalCategory } = useAppStore((state) => state);

  const checkViewMedikit = (medi: MediKit) => {
    return (
      (medicalCategory === "ALL" || medicalCategory === "Medikit") &&
      medi.category === "Medikit"
    );
  };

  if (medicalCategory !== "ALL" && medicalCategory !== "Medikit") return null;

  return (
    <div className="w-full">
      {medicalList.map(
        (medikit) =>
          checkViewMedikit(medikit) && (
            <div
              className="w-full grid grid-cols-7 gap-2 border-solid border-white border-2 mb-4 rounded-lg p-3"
              key={medikit.id}
            >
              <div className="flex justify-center items-center">
                <Gallery>
                  <Item original={medikit.image} width="200" height="180">
                    {({ ref, open }) => (
                      <Image
                        ref={ref}
                        onClick={open}
                        src={medikit.image}
                        height={0}
                        width={120}
                        style={{ width: "auto", height: "auto" }}
                        alt={medikit.name_en}
                        priority
                      />
                    )}
                  </Item>
                </Gallery>
              </div>
              <div className="flex justify-center items-center">
                <span className="text-center font-bold text-sm">
                  {medikit.name_kr}
                </span>
              </div>
              <div className="flex justify-center items-center">
                <span className="text-center font-bold text-sm">
                  {medikit.hitpoints}
                </span>
              </div>
              <div className="flex flex-col justify-center items-center">
                {medikit.cures_kr && medikit.cures_kr.length > 0 ? (
                  medikit.cures_kr.map((cures, index) => (
                    <span
                      key={`medikit-${index}`}
                      className="font-bold text-sm"
                    >
                      {cures}
                    </span>
                  ))
                ) : (
                  <span className="font-bold text-sm">-</span>
                )}
              </div>
              <div className="flex justify-center items-center">
                <span className="text-center font-bold text-sm">-</span>
              </div>
              <div className="flex justify-center items-center">
                <span className="text-center font-bold text-sm">-</span>
              </div>
              <div className="flex justify-center items-center">
                <span className="text-center font-bold text-sm">
                  {medikit.use_time} 초
                </span>
              </div>
            </div>
          )
      )}
    </div>
  );
}
