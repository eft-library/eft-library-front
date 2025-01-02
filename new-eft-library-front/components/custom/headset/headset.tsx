import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetColumn from "@/components/custom/getColumn/getColumn";
import { COLUMN_KEY } from "@/lib/consts/columnConsts";
import GetHeadset from "./data/getHeadset";

export default function Headset() {
  return (
    <ContentsWrapper>
      <div className="flex flex-col justify-between items-center gap-10 my-10">
        <h1 className="text-white text-4xl font-bold text-center">헤드셋</h1>
        <GetColumn columnDesign={2} columnKey={COLUMN_KEY.headset} />
        <GetHeadset />
      </div>
    </ContentsWrapper>
  );
}
