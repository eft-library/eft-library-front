import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetColumn from "@/components/custom/getColumn/getColumn";
import { COLUMN_KEY } from "@/lib/consts/columnConsts";
import GetHeadset from "./data/getHeadset";
import AdBanner from "../adsense/adBanner";

export default function Headset() {
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">헤드셋</h1>
      <div className="w-full">
        <AdBanner
          dataAdFormat={"auto"}
          dataFullWidthResponsive={true}
          dataAdSlot="2690838054"
        />
      </div>
      <GetColumn columnDesign={2} columnKey={COLUMN_KEY.headset} />
      <GetHeadset />
    </ContentsWrapper>
  );
}
