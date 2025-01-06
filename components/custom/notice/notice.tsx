import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetNotice from "@/components/custom/notice/data/getNotice";
import AdBanner from "../adsense/adBanner";

export default function Notice() {
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">공지사항</h1>
      <div className="w-full">
        <AdBanner
          dataAdFormat={"auto"}
          dataFullWidthResponsive={true}
          dataAdSlot="2690838054"
        />
      </div>
      <GetNotice />
    </ContentsWrapper>
  );
}
