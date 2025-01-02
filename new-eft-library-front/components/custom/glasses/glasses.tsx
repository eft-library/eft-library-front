import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetColumn from "../getColumn/getColumn";
import { COLUMN_KEY } from "@/lib/consts/columnConsts";
import GetGlasses from "./data/getGlasses";

export default function Glasses() {
  return (
    <ContentsWrapper>
      <div className="flex flex-col justify-between items-center gap-10 my-10">
        <h1 className="text-white text-4xl font-bold text-center">안경</h1>
        <GetColumn columnDesign={5} columnKey={COLUMN_KEY.glassesClass} />
        <GetGlasses isClass />
        <GetColumn columnDesign={4} columnKey={COLUMN_KEY.glassesNoClass} />
        <GetGlasses isClass={false} />
      </div>
    </ContentsWrapper>
  );
}
