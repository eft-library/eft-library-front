import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetColumn from "@/components/custom/getColumn/getColumn";
import { COLUMN_KEY } from "@/lib/consts/columnConsts";
import GetLoot from "./data/getLoot";
import GetLootSelector from "./data/getLootSelector";
import AdBanner from "../adsense/adBanner";

export default function Loot() {
  return (
    <ContentsWrapper>
      <div className="flex flex-col justify-between items-center gap-10 my-10">
        <h1 className="text-white text-4xl font-bold text-center">전리품</h1>
        <div className="w-full">
          <AdBanner
            dataAdFormat={"fluid"}
            dataFullWidthResponsive={true}
            dataAdSlot="2690838054"
          />
        </div>
        <GetLootSelector />
        <GetColumn columnDesign={3} columnKey={COLUMN_KEY.loot} />
      </div>
      <GetLoot />
    </ContentsWrapper>
  );
}
