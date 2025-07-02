"use client";

import type { MedicalClient } from "./medicalTypes";
import MediKitClient from "@/components/page/medical/data//medikitClient";
import DrugClient from "@/components/page/medical/data/drugClient";
import ItemClient from "@/components/page/medical/data/itemClient";
import StimulantClient from "@/components/page/medical/data/stimulantClient";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function MedicalClient({ medical }: MedicalClient) {
  const [word, setWord] = useState<string>("");
  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex gap-2 mb-2 justify-end">
        <Input
          className="text-base font-bold border-white placeholder:text-SilverGray w-[400px] border-2"
          value={word}
          placeholder="이름을 최소 2글자 입력하세요"
          onChange={(e) => setWord(e.currentTarget.value)}
        />
      </div>
      <MediKitClient medicalList={medical.Medikit} searchWord={word} />
      <DrugClient medicalList={medical.Drug} searchWord={word} />
      <ItemClient medicalList={medical.Medicalitem} searchWord={word} />
      <StimulantClient medicalList={medical.Stimulant} searchWord={word} />
    </div>
  );
}
