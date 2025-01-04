import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetNoticeDetail from "@/components/custom/noticeDetail/data/getNoticeDetail";

export default function NoticeDetail() {
  return (
    <ContentsWrapper>
      <div className="flex flex-col justify-between items-center gap-10 my-10">
        <h1 className="text-white text-4xl font-bold text-center">공지</h1>
        <GetNoticeDetail />
      </div>
    </ContentsWrapper>
  );
}
