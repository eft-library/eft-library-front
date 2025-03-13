import { COLUMN_KEY } from "@/lib/consts/columnConsts";
import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetColumn from "../../custom/getColumn/getColumn";
import GetHeadWear from "./data/getHeadWear";
// import AdBanner from "../../custom/adsense/adBanner";

export default function HeadWear() {
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">방탄모</h1>
      <div className="w-[1200px]">
        {/* <AdBanner
          dataAdFormat={"auto"}
          dataFullWidthResponsive={true}
          dataAdSlot="2690838054"
        /> */}
      </div>
      <GetColumn columnKey={COLUMN_KEY.headWearClass} columnDesign={7} />
      <GetHeadWear isClass />
      <GetColumn columnKey={COLUMN_KEY.headwearNoClass} columnDesign={2} />
      <GetHeadWear isClass={false} />
    </ContentsWrapper>
  );
}
