import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetColumn from "@/components/custom/getColumn/getColumn";
import { COLUMN_KEY } from "@/lib/consts/columnConsts";

export default function Backpack() {
  return (
    <ContentsWrapper>
      <GetColumn columnDesign={5} columnKey={COLUMN_KEY.backpack} />
    </ContentsWrapper>
  );
}
