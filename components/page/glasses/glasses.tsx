import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetGlasses from "./data/getGlasses";
import AdBanner from "../../custom/adsense/adBanner";
import TableColumn from "@/components/custom/tableColumn/tableColumn";
import {
  glassesClassColumn,
  glassesNoClassColumn,
} from "@/lib/consts/columnConsts";

export default function Glasses() {
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">안경</h1>
      <div className="w-[1200px]">
        <AdBanner
          dataAdFormat={"auto"}
          dataFullWidthResponsive={true}
          dataAdSlot="2690838054"
        />
      </div>
      <TableColumn columnDesign={5} columnData={glassesClassColumn} />
      <GetGlasses isClass />
      <TableColumn columnDesign={3} columnData={glassesNoClassColumn} />
      <GetGlasses isClass={false} />
    </ContentsWrapper>
  );
}
