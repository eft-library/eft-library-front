import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetMedical from "./data/getMedical";
import GetColumn from "@/components/custom/getColumn/getColumn";
import {COLUMN_KEY} from "@/lib/consts/columnConsts";

export default function Medical() {
  return (
    <ContentsWrapper>
      <div className="flex flex-col justify-between items-center gap-10 my-10">
        <h1 className="text-white text-4xl font-bold text-center">의료품</h1>
          <GetColumn columnDesign={6} columnKey={COLUMN_KEY.drug} />
          <GetMedical medicalType="Drug" />
          <GetColumn columnDesign={4} columnKey={COLUMN_KEY.stimulant} />
          <GetMedical medicalType="Stimulant" />
          <GetColumn columnDesign={5} columnKey={COLUMN_KEY.medicalItem} />
          <GetMedical medicalType="Medical item" />
          <GetColumn columnDesign={5} columnKey={COLUMN_KEY.medikit} />
          <GetMedical medicalType="Medikit" />
      </div>
    </ContentsWrapper>
  );
}
