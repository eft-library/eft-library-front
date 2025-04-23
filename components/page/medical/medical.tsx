import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetMedical from "./data/getMedical";
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
      <GetMedical />
    </ContentsWrapper>
  );
}
