import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetEvent from "@/components/custom/event/data/getEvent";

export default function Event() {
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">이벤트</h1>
      <GetEvent />
    </ContentsWrapper>
  );
}
