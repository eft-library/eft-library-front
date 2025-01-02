import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetColumn from "@/components/custom/getColumn/getColumn";
import { COLUMN_KEY } from "@/lib/consts/columnConsts";

export default function Headset() {
  return (
    <ContentsWrapper>
      <GetColumn columnDesign={2} columnKey={COLUMN_KEY.headset} />
    </ContentsWrapper>
  );
}
