import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetPlanner from "./data/getPlanner";
// import AdBanner from "../../custom/adsense/adBanner";

export default function Planner() {
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">
        퀘스트 플래너
      </h1>
      <div className="w-[1200px]">
        {/* <AdBanner
          dataAdFormat={"auto"}
          dataFullWidthResponsive={true}
          dataAdSlot="2690838054"
        /> */}
      </div>
      <GetPlanner />
    </ContentsWrapper>
  );
}
