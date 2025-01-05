import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetQuest from "./data/getQuest";
import GetQuestSelector from "./data/getQuestSelector";

export default function Quest() {
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">퀘스트</h1>
      <GetQuestSelector />
      <GetQuest />
    </ContentsWrapper>
  );
}