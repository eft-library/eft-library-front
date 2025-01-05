import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetPatchNotes from "@/components/custom/patchNotes/data/getPatchNotes";

export default function PatchNotes() {
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">패치노트</h1>
      <GetPatchNotes />
    </ContentsWrapper>
  );
}
