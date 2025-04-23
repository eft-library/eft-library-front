import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetHeadWear from "./data/getHeadWear";
import AdBanner from "../../custom/adsense/adBanner";

export default function HeadWear() {
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">방탄모</h1>
      <div className="w-[1200px]">
        <AdBanner
          dataAdFormat={"auto"}
          dataFullWidthResponsive={true}
          dataAdSlot="2690838054"
        />
      </div>
      <GetHeadWear />
    </ContentsWrapper>
  );
}
