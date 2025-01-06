import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetEvent from "@/components/page/event/data/getEvent";
import AdBanner from "../../custom/adsense/adBanner";

export default function Event() {
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">이벤트</h1>
      <div className="w-full">
        <AdBanner
          dataAdFormat={"auto"}
          dataFullWidthResponsive={true}
          dataAdSlot="2690838054"
        />
      </div>
      <GetEvent />
    </ContentsWrapper>
  );
}
