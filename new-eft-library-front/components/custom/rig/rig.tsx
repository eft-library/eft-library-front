import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetRig from "./data/getRig";
import GetColumn from "../getColumn/getColumn";
import { COLUMN_KEY } from "@/lib/consts/columnConsts";

export default function Rig() {
  return (
    <ContentsWrapper>
      <div className="flex flex-col justify-between items-center gap-10 my-10">
        <h1 className="text-white text-4xl font-bold text-center">전술 조끼</h1>
        <GetColumn columnDesign={7} columnKey={COLUMN_KEY.rigClass} />
        <GetRig isClass />
        <GetColumn columnDesign={4} columnKey={COLUMN_KEY.rigNoClass} />
        <GetRig isClass={false} />
      </div>
    </ContentsWrapper>
  );
}
