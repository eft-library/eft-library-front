import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetColumn from "../../custom/getColumn/getColumn";
import { COLUMN_KEY } from "@/lib/consts/columnConsts";
import GetGlasses from "./data/getGlasses";
import AdBanner from "../../custom/adsense/adBanner";

export default function Glasses() {
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">안경</h1>
      <div className="w-full">
        <AdBanner
          dataAdFormat={"auto"}
          dataFullWidthResponsive={true}
          dataAdSlot="2690838054"
        />
      </div>
      <GetColumn columnDesign={5} columnKey={COLUMN_KEY.glassesClass} />
      <GetGlasses isClass />
      <GetColumn columnDesign={4} columnKey={COLUMN_KEY.glassesNoClass} />
      <GetGlasses isClass={false} />
    </ContentsWrapper>
  );
}
