import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetPatchNotes from "@/components/custom/patchNotes/data/getPatchNotes";

export default function PatchNotes() {
  return (
    <ContentsWrapper>
      <div className="flex flex-col justify-between items-center gap-10 my-10">
        <h1 className="text-white text-4xl font-bold text-center">패치노트</h1>
        <GetPatchNotes />
      </div>
    </ContentsWrapper>
  );
}
