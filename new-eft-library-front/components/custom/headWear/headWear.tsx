import { COLUMN_KEY } from "@/lib/consts/columnConsts";
import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetColumn from "../getColumn/getColumn";

export default function HeadWear() {
  return (
    <ContentsWrapper>
      <GetColumn columnKey={COLUMN_KEY.headwear} columnDesign={7} />
    </ContentsWrapper>
  );
}
