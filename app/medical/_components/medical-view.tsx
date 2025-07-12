"use client";

import type { MedicalViewTypes } from "./medical.types";
import Medikit from "./Medikit/medikit";
import Drug from "./Drug/drug";
import MedicalItem from "./MedicalItem/medical-item";
import Stimulant from "./Stimulant/stimulant";

export default function MedicalView({ medical }: MedicalViewTypes) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8 ">
        <h1 className={`text-4xl font-bold mb-4 text-black dark:text-gray-300`}>
          의료품
        </h1>
        <div className="max-w-md mx-auto">
          <div className="relative">
            {/* <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="아이템 혹은 스킬을 검색하세요"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-10 ${
                  isDarkMode
                    ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                    : "bg-white border-gray-300 text-black"
                }`}
              /> */}
          </div>
        </div>
      </div>
      <Medikit searchWord="" medicalList={medical.Medikit} />
      <Drug searchWord="" medicalList={medical.Drug} />
      <MedicalItem searchWord="" medicalList={medical.Medicalitem} />
      <Stimulant searchWord="" medicalList={medical.Stimulant} />
    </div>
  );
}
