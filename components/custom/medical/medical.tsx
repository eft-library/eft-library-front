import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetMedical from "./data/getMedical";
import GetMedicalSelector from "@/components/custom/medical/data/medicalSelector";
import { COLUMN_KEY } from "@/lib/consts/columnConsts";
import GetColumn from "@/components/custom/getColumn/getColumn";
import AdBanner from "../adsense/adBanner";

export default function Medical() {
  return (
    <ContentsWrapper>
      <div className="flex flex-col justify-between items-center gap-10 my-10">
        <h1 className="text-white text-4xl font-bold text-center">의료품</h1>
        <AdBanner
          dataAdFormat={"fluid"}
          dataFullWidthResponsive={true}
          dataAdSlot="2690838054"
        />
        <GetMedicalSelector />
        <GetColumn columnDesign={7} columnKey={COLUMN_KEY.medical} />
        <GetMedical medicalType="Drug" />
        <GetMedical medicalType="Stimulant" />
        <GetMedical medicalType="Medical item" />
        <GetMedical medicalType="Medikit" />
      </div>
    </ContentsWrapper>
  );
}
