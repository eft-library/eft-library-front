import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetQuestDetail from "./data/getQuestDetail";

export default function QuestDetail() {
  return (
    <ContentsWrapper>
      <div className="flex flex-col justify-between items-center gap-10 my-10">
        <GetQuestDetail />
      </div>
    </ContentsWrapper>
  );
}
