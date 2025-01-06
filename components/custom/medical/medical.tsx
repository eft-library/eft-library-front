import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetMedical from "./data/getMedical";
import GetMedicalSelector from "@/components/custom/medical/data/medicalSelector";
import { COLUMN_KEY } from "@/lib/consts/columnConsts";
import GetColumn from "@/components/custom/getColumn/getColumn";
import AdBanner from "../adsense/adBanner";

export default function Medical() {
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">의료품</h1>
      <div className="w-full">
        <AdBanner
          dataAdFormat={"auto"}
          dataFullWidthResponsive={true}
          dataAdSlot="2690838054"
        />
      </div>
      <GetMedicalSelector />
      <GetColumn columnDesign={7} columnKey={COLUMN_KEY.medical} />
      <GetMedical medicalType="Drug" />
      <GetMedical medicalType="Stimulant" />
      <GetMedical medicalType="Medical item" />
      <GetMedical medicalType="Medikit" />
    </ContentsWrapper>
  );
}
