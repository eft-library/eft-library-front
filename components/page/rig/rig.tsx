import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetRig from "./data/getRig";
import {
  rigClassTableColumn,
  rigNoClassTableColumn,
} from "@/lib/consts/columnConsts";
import AdBanner from "../../custom/adsense/adBanner";
import TableColumn from "@/components/custom/tableColumn/tableColumn";

export default function Rig() {
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">전술 조끼</h1>
      <div className="w-[1200px]">
        <AdBanner
          dataAdFormat={"auto"}
          dataFullWidthResponsive={true}
          dataAdSlot="2690838054"
        />
      </div>
      <TableColumn columnDesign={7} columnData={rigClassTableColumn} />
      <GetRig isClass />
      <TableColumn columnDesign={3} columnData={rigNoClassTableColumn} />
      <GetRig isClass={false} />
    </ContentsWrapper>
  );
}
