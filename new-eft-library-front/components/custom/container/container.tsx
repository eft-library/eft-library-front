import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetColumn from "@/components/custom/getColumn/getColumn";
import { COLUMN_KEY } from "@/lib/consts/columnConsts";

export default function Container() {
  return (
    <ContentsWrapper>
      <GetColumn columnDesign={4} columnKey={COLUMN_KEY.container} />
    </ContentsWrapper>
  );
}
