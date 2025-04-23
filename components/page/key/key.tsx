import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetKey from "./data/getKey";
import AdBanner from "../../custom/adsense/adBanner";

export default function Key() {
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">열쇠</h1>
      <div className="w-[1200px]">
        <AdBanner
          dataAdFormat={"auto"}
          dataFullWidthResponsive={true}
          dataAdSlot="2690838054"
        />
      </div>
      <GetKey />
    </ContentsWrapper>
  );
}
