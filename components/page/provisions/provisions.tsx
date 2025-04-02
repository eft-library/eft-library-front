import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import { provisionsTableColumn } from "@/lib/consts/columnConsts";
import GetProvisions from "./data/getProvisions";
import AdBanner from "../../custom/adsense/adBanner";
import TableColumn from "@/components/custom/tableColumn/tableColumn";

export default function Provisions() {
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">식량</h1>
      <div className="w-[1200px]">
        <AdBanner
          dataAdFormat={"auto"}
          dataFullWidthResponsive={true}
          dataAdSlot="2690838054"
        />
      </div>
      <TableColumn
        columnDesign={7}
        columnData={provisionsTableColumn}
        isProvision
      />
      <GetProvisions />
    </ContentsWrapper>
  );
}
