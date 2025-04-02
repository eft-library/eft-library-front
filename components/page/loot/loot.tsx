import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import { lootTableColumn } from "@/lib/consts/columnConsts";
import GetLoot from "./data/getLoot";
import LootSelectorClient from "./data/lootSelectorClient";
import AdBanner from "../../custom/adsense/adBanner";
import TableColumn from "@/components/custom/tableColumn/tableColumn";

export default function Loot() {
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">전리품</h1>
      <div className="w-[1200px]">
        <AdBanner
          dataAdFormat={"auto"}
          dataFullWidthResponsive={true}
          dataAdSlot="2690838054"
        />
      </div>
      <LootSelectorClient />
      <TableColumn columnDesign={2} columnData={lootTableColumn} />
      <GetLoot />
    </ContentsWrapper>
  );
}
