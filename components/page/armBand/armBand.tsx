import GetArmBand from "@/components/page/armBand/data/getArmBand";
import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import AdBanner from "../../custom/adsense/adBanner";

export default function ArmBand() {
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">완장</h1>
      <div className="w-[1200px]">
        <AdBanner
          dataAdFormat={"auto"}
          dataFullWidthResponsive={true}
          dataAdSlot="2690838054"
        />
      </div>
      <GetArmBand />
    </ContentsWrapper>
  );
}
