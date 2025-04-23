import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetGlasses from "./data/getGlasses";
import AdBanner from "../../custom/adsense/adBanner";

export default function Glasses() {
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">안경</h1>
      <div className="w-[1200px]">
        <AdBanner
          dataAdFormat={"auto"}
          dataFullWidthResponsive={true}
          dataAdSlot="2690838054"
        />
      </div>
      <GetGlasses />
    </ContentsWrapper>
  );
}
