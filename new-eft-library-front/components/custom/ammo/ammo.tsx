import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetColumn from "@/components/custom/getColumn/getColumn";
import { COLUMN_KEY } from "@/lib/consts/columnConsts";

export default function Ammo() {
  return (
    <ContentsWrapper>
      <GetColumn columnDesign={11} columnKey={COLUMN_KEY.ammo} isAmmo />
    </ContentsWrapper>
  );
}
