import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetRig from "./data/getRig";
import AdBanner from "../../custom/adsense/adBanner";

export default function Rig() {
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">전술 조끼</h1>
      <div className="w-[1200px]">
        <AdBanner
          dataAdFormat={"auto"}
          dataFullWidthResponsive={true}
          dataAdSlot="2690838054"
        />
      </div>
      <GetRig />
    </ContentsWrapper>
  );
}
