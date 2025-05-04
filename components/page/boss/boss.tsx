import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetBoss from "./data/getBoss";

export default function Boss() {
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">보스</h1>
      <GetBoss />
    </ContentsWrapper>
  );
}
