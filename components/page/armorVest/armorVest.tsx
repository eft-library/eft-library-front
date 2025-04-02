import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import { armorVestTableColumn } from "@/lib/consts/columnConsts";
import GetArmorVest from "./data/getArmorVest";
import AdBanner from "../../custom/adsense/adBanner";
import TableColumn from "@/components/custom/tableColumn/tableColumn";

export default function ArmorVest() {
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">방탄 조끼</h1>
      <div className="w-[1200px]">
        <AdBanner
          dataAdFormat={"auto"}
          dataFullWidthResponsive={true}
          dataAdSlot="2690838054"
        />
      </div>
      <TableColumn columnDesign={6} columnData={armorVestTableColumn} />
      <GetArmorVest />
    </ContentsWrapper>
  );
}
