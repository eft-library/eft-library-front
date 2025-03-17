import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import AdBanner from "../../custom/adsense/adBanner";
import RankClient from "./data/rankClient";

export default function Rank() {
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">아이템 랭크</h1>
      <div className="w-[1200px]">
        <AdBanner
          dataAdFormat={"auto"}
          dataFullWidthResponsive={true}
          dataAdSlot="2690838054"
        />
      </div>
      <RankClient />
    </ContentsWrapper>
  );
}
