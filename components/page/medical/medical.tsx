import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetMedical from "./data/getMedical";
import MedicalSelectorClient from "./data/medicalSelectorClient";
import { COLUMN_KEY } from "@/lib/consts/columnConsts";
import GetColumn from "@/components/custom/getColumn/getColumn";
import AdBanner from "../../custom/adsense/adBanner";

export default function Medical() {
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">의료품</h1>
      <div className="w-[1200px]">
        <AdBanner
          dataAdFormat={"auto"}
          dataFullWidthResponsive={true}
          dataAdSlot="2690838054"
        />
      </div>
      <MedicalSelectorClient />
      <GetColumn columnDesign={10} columnKey={COLUMN_KEY.medical} isMedical />
      <GetMedical medicalType="Drug" />
      <GetMedical medicalType="Stimulant" />
      <GetMedical medicalType="Medical item" />
      <GetMedical medicalType="Medikit" />
    </ContentsWrapper>
  );
}
