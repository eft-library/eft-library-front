import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetColumn from "@/components/custom/getColumn/getColumn";
import { COLUMN_KEY } from "@/lib/consts/columnConsts";
import GetBackpack from "./data/getBackpack";

export default function Backpack() {
  return (
    <ContentsWrapper>
      <div className="flex flex-col justify-between items-center gap-10 my-10">
        <h1 className="text-white text-4xl font-bold text-center">배낭</h1>
        <GetColumn columnDesign={5} columnKey={COLUMN_KEY.backpack} />
        <GetBackpack />
      </div>
    </ContentsWrapper>
  );
}
