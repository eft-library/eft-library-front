import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetPatchNotes from "@/components/page/patchNotes/data/getPatchNotes";
// import AdBanner from "../../custom/adsense/adBanner";

export default function PatchNotes() {
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">패치노트</h1>
      <div className="w-[1200px]">
        {/* <AdBanner
          dataAdFormat={"auto"}
          dataFullWidthResponsive={true}
          dataAdSlot="2690838054"
        /> */}
      </div>
      <GetPatchNotes />
    </ContentsWrapper>
  );
}
