import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetPatchNotes from "@/components/custom/patchNotes/data/getPatchNotes";
import AdBanner from "../adsense/adBanner";

export default function PatchNotes() {
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">패치노트</h1>
      <div className="w-full">
        <AdBanner
          dataAdFormat={"fluid"}
          dataFullWidthResponsive={true}
          dataAdSlot="2690838054"
        />
      </div>
      <GetPatchNotes />
    </ContentsWrapper>
  );
}
