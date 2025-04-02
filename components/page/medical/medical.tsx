import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetMedical from "./data/getMedical";
import MedicalSelectorClient from "./data/medicalSelectorClient";
import { medicalTableColumn } from "@/lib/consts/columnConsts";
import AdBanner from "../../custom/adsense/adBanner";
import TableColumn from "@/components/custom/tableColumn/tableColumn";

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
      <TableColumn
        columnDesign={10}
        columnData={medicalTableColumn}
        isMedical
      />
      <GetMedical medicalType="Drug" />
      <GetMedical medicalType="Stimulant" />
      <GetMedical medicalType="Medical item" />
      <GetMedical medicalType="Medikit" />
    </ContentsWrapper>
  );
}
