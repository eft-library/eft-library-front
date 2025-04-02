import GetArmBand from "@/components/page/armBand/data/getArmBand";
import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import { armBandTableColumn } from "@/lib/consts/columnConsts";
import AdBanner from "../../custom/adsense/adBanner";
import TableColumn from "@/components/custom/tableColumn/tableColumn";

export default function ArmBand() {
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">완장</h1>
      <div className="w-[1200px]">
        <AdBanner
          dataAdFormat={"auto"}
          dataFullWidthResponsive={true}
          dataAdSlot="2690838054"
        />
      </div>
      <TableColumn columnData={armBandTableColumn} columnDesign={2} />
      <GetArmBand />
    </ContentsWrapper>
  );
}
