import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetNoticeDetail from "@/components/page/noticeDetail/data/getNoticeDetail";

export default function NoticeDetail() {
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">공지</h1>
      <GetNoticeDetail />
    </ContentsWrapper>
  );
}
