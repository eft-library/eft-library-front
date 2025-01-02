import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetFaceCover from "./data/getFaceCover";
import GetColumn from "../getColumn/getColumn";
import { COLUMN_KEY } from "@/lib/consts/columnConsts";

export default function FaceCover() {
  return (
    <ContentsWrapper>
      <div className="flex flex-col justify-between items-center gap-10 my-10">
        <h1 className="text-white text-4xl font-bold text-center">얼굴 커버</h1>
        <GetColumn columnDesign={7} columnKey={COLUMN_KEY.faceCoverClass} />
        <GetFaceCover isClass />
        <GetColumn columnDesign={2} columnKey={COLUMN_KEY.faceCoverNoClass} />
        <GetFaceCover isClass={false} />
      </div>
    </ContentsWrapper>
  );
}
