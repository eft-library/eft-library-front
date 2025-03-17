import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import AdBanner from "../../custom/adsense/adBanner";
import GetWipe from "./data/getWipe";

export default function Wipe() {
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">시즌 초기화</h1>
      <div className="w-[1200px]">
        <AdBanner
          dataAdFormat={"auto"}
          dataFullWidthResponsive={true}
          dataAdSlot="2690838054"
        />
      </div>
      <GetWipe />
    </ContentsWrapper>
  );
}
