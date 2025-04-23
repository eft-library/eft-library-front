import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetContainer from "./data/getContainer";
import AdBanner from "../../custom/adsense/adBanner";

export default function Container() {
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">컨테이너</h1>
      <div className="w-[1200px]">
        <AdBanner
          dataAdFormat={"auto"}
          dataFullWidthResponsive={true}
          dataAdSlot="2690838054"
        />
      </div>
      <GetContainer />
    </ContentsWrapper>
  );
}
