import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetStation from "./data/getStation";
import AdBanner from "../../custom/adsense/adBanner";

export default function HideoutStation() {
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">은신처</h1>
      <div className="w-[1200px]">
        <AdBanner
          dataAdFormat={"auto"}
          dataFullWidthResponsive={true}
          dataAdSlot="2690838054"
        />
      </div>
      <GetStation />
    </ContentsWrapper>
  );
}
