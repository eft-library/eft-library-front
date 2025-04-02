import {
  headwearClassTableColumn,
  headwearNoClassTableColumn,
} from "@/lib/consts/columnConsts";
import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetHeadWear from "./data/getHeadWear";
import AdBanner from "../../custom/adsense/adBanner";
import TableColumn from "@/components/custom/tableColumn/tableColumn";

export default function HeadWear() {
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">방탄모</h1>
      <div className="w-[1200px]">
        <AdBanner
          dataAdFormat={"auto"}
          dataFullWidthResponsive={true}
          dataAdSlot="2690838054"
        />
      </div>
      <TableColumn columnDesign={7} columnData={headwearClassTableColumn} />
      <GetHeadWear isClass />
      <TableColumn columnDesign={2} columnData={headwearNoClassTableColumn} />
      <GetHeadWear isClass={false} />
    </ContentsWrapper>
  );
}
