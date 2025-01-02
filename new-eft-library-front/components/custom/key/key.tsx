import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetColumn from "@/components/custom/getColumn/getColumn";
import { COLUMN_KEY } from "@/lib/consts/columnConsts";

export default function Key() {
  return (
    <ContentsWrapper>
      <GetColumn columnDesign={6} columnKey={COLUMN_KEY.key} isNote />
    </ContentsWrapper>
  );
}
