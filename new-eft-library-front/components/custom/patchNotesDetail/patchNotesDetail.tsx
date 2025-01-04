import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetPatchNotesDetail from "@/components/custom/patchNotesDetail/data/getPatchNotesDetail";

export default function PatchNotesDetail() {
  return (
    <ContentsWrapper>
      <div className="flex flex-col justify-between items-center gap-10 my-10">
        <h1 className="text-white text-4xl font-bold text-center">패치노트</h1>
        <GetPatchNotesDetail />
      </div>
    </ContentsWrapper>
  );
}
