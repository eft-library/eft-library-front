import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetHeadset from "./data/getHeadset";
import AdBanner from "../../custom/adsense/adBanner";

export default function Headset() {
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">헤드셋</h1>
      <div className="w-[1200px]">
        <AdBanner
          dataAdFormat={"auto"}
          dataFullWidthResponsive={true}
          dataAdSlot="2690838054"
        />
      </div>
      <GetHeadset />
    </ContentsWrapper>
  );
}
