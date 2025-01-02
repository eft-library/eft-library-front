import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetColumn from "@/components/custom/getColumn/getColumn";
import { COLUMN_KEY } from "@/lib/consts/columnConsts";
import GetProvisions from "./data/getProvisions";

export default function Provisions() {
  return (
    <ContentsWrapper>
      <div className="flex flex-col justify-between items-center gap-10 my-10">
        <h1 className="text-white text-4xl font-bold text-center">식량</h1>
        <GetColumn
          columnDesign={8}
          columnKey={COLUMN_KEY.provisions}
          isProvision
        />
        <GetProvisions />
      </div>
    </ContentsWrapper>
  );
}
