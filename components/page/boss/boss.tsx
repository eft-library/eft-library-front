import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetColumn from "../../custom/getColumn/getColumn";
import { COLUMN_KEY } from "@/lib/consts/columnConsts";
import GetBoss from "./data/getBoss";
import BossSelectorClient from "./data/bossSelectorClient";

export default function Boss() {
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">보스</h1>
      <BossSelectorClient />
      <GetColumn columnDesign={7} columnKey={COLUMN_KEY.boss} />
      <GetBoss />
    </ContentsWrapper>
  );
}
