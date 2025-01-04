import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetNotice from "@/components/custom/notice/data/getNotice";

export default function Notice() {
  return (
    <ContentsWrapper>
      <div className="flex flex-col justify-between items-center gap-10 my-10">
        <h1 className="text-white text-4xl font-bold text-center">공지사항</h1>
        <GetNotice />
      </div>
    </ContentsWrapper>
  );
}
