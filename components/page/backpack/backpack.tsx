import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import { backpackTableColumn } from "@/lib/consts/columnConsts";
import GetBackpack from "./data/getBackpack";
import AdBanner from "../../custom/adsense/adBanner";
import TableColumn from "@/components/custom/tableColumn/tableColumn";

export default function Backpack() {
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">가방</h1>
      <div className="w-[1200px]">
        <AdBanner
          dataAdFormat={"auto"}
          dataFullWidthResponsive={true}
          dataAdSlot="2690838054"
        />
      </div>
      <TableColumn columnDesign={5} columnData={backpackTableColumn} />
      <GetBackpack />
    </ContentsWrapper>
  );
}
