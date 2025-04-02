import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import { bossTableColumn } from "@/lib/consts/columnConsts";
import GetBoss from "./data/getBoss";
import BossSelectorClient from "./data/bossSelectorClient";
import TableColumn from "@/components/custom/tableColumn/tableColumn";

export default function Boss() {
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">보스</h1>
      <BossSelectorClient />
      <TableColumn columnDesign={7} columnData={bossTableColumn} />
      <GetBoss />
    </ContentsWrapper>
  );
}
