import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetBossSelector from "./data/getBossSelector";
import GetColumn from "../getColumn/getColumn";
import { COLUMN_KEY } from "@/lib/consts/columnConsts";
import GetBoss from "./data/getBoss";

export default function Boss() {
  return (
    <ContentsWrapper>
      <div className="flex flex-col justify-between items-center gap-10 my-10">
        <h1 className="text-white text-4xl font-bold text-center">보스</h1>
        <GetBossSelector />
        <GetColumn columnDesign={7} columnKey={COLUMN_KEY.boss} />
        <GetBoss />
      </div>
    </ContentsWrapper>
  );
}
