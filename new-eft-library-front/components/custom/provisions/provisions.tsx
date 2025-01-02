import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetColumn from "@/components/custom/getColumn/getColumn";
import { COLUMN_KEY } from "@/lib/consts/columnConsts";

export default function Provisions() {
  return (
    <ContentsWrapper>
      <GetColumn columnDesign={7} columnKey={COLUMN_KEY.provisions} isNote />
    </ContentsWrapper>
  );
}
