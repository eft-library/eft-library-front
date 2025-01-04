import { COLUMN_KEY } from "@/lib/consts/columnConsts";
import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetColumn from "../getColumn/getColumn";
import GetHeadWear from "./data/getHeadWear";
import AdBanner from "../adsense/adBanner";

export default function HeadWear() {
  return (
    <ContentsWrapper>
      <div className="flex flex-col justify-between items-center gap-10 my-10">
        <h1 className="text-white text-4xl font-bold text-center">방탄모</h1>
        <div className="w-full">
          <AdBanner
            dataAdFormat={"fluid"}
            dataFullWidthResponsive={true}
            dataAdSlot="2690838054"
          />
        </div>
        <GetColumn columnKey={COLUMN_KEY.headWearClass} columnDesign={7} />
        <GetHeadWear isClass />
        <GetColumn columnKey={COLUMN_KEY.headwearNoClass} columnDesign={2} />
        <GetHeadWear isClass={false} />
      </div>
    </ContentsWrapper>
  );
}
