import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetColumn from "@/components/custom/getColumn/getColumn";
import { COLUMN_KEY } from "@/lib/consts/columnConsts";
import GetBackpack from "./data/getBackpack";
import AdBanner from "../adsense/adBanner";

export default function Backpack() {
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">가방</h1>
      <div className="w-full">
        <AdBanner
          dataAdFormat={"fluid"}
          dataFullWidthResponsive={true}
          dataAdSlot="2690838054"
        />
      </div>
      <GetColumn columnDesign={5} columnKey={COLUMN_KEY.backpack} />
      <GetBackpack />
    </ContentsWrapper>
  );
}
