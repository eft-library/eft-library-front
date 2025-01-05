import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetPatchNotesDetail from "@/components/custom/patchNotesDetail/data/getPatchNotesDetail";

export default function PatchNotesDetail() {
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">패치노트</h1>
      <GetPatchNotesDetail />
    </ContentsWrapper>
  );
}
