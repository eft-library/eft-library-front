import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetRoadmap from "./data/getRoadmap";
import AdBanner from "@/components/custom/adsense/adBanner";

export default function Roadmap() {
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">
        퀘스트 로드맵
      </h1>
      <div className="w-[1200px]">
        <AdBanner
          dataAdFormat={"auto"}
          dataFullWidthResponsive={true}
          dataAdSlot="2690838054"
        />
      </div>
      <GetRoadmap />
    </ContentsWrapper>
  );
}
