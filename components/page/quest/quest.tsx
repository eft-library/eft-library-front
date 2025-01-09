import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetQuest from "./data/getQuest";
import GetQuestSelector from "./data/getQuestSelector";
import AdBanner from "../../custom/adsense/adBanner";

export default function Quest() {
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">퀘스트</h1>
      <GetQuestSelector />
      <div className="w-[1200px]">
        <AdBanner
          dataAdFormat={"auto"}
          dataFullWidthResponsive={true}
          dataAdSlot="2690838054"
        />
      </div>
      <GetQuest />
    </ContentsWrapper>
  );
}
