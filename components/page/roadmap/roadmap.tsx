import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetRoadmap from "./data/getRoadmap";
import AdBanner from "@/components/custom/adsense/adBanner";
import TextSpan from "@/components/custom/gridContents/textSpan";

export default function Roadmap() {
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center -[mb-2]">
        퀘스트 로드맵
      </h1>
      <TextSpan isCenter={false} textColor="SunsetYellow">
        (베타 버전 - 저장 기능 개발중)
      </TextSpan>
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
