import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetUserQuest from "@/components/custom/userQuest/data/getUserQuest";
import AdBanner from "../adsense/adBanner";

export default function UserQuest() {
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">
        퀘스트 플래너
      </h1>
      <div className="w-full flex justify-center items-center">
        <AdBanner
          dataAdFormat={"auto"}
          dataFullWidthResponsive={true}
          dataAdSlot="2690838054"
        />
      </div>
      <GetUserQuest />
    </ContentsWrapper>
  );
}
