import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetLoot from "./data/getLoot";
import AdBanner from "../../custom/adsense/adBanner";

export default function Loot() {
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">전리품</h1>
      <div className="w-[1200px]">
        <AdBanner
          dataAdFormat={"auto"}
          dataFullWidthResponsive={true}
          dataAdSlot="2690838054"
        />
      </div>
      <GetLoot />
    </ContentsWrapper>
  );
}
