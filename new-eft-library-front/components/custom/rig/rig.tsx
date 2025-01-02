import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetColumn from "@/components/custom/getColumn/getColumn";
import { COLUMN_KEY } from "@/lib/consts/columnConsts";

export default function Rig() {
  return (
    <ContentsWrapper>
      <GetColumn columnDesign={7} columnKey={COLUMN_KEY.rig} isAmmo />
    </ContentsWrapper>
  );
}
