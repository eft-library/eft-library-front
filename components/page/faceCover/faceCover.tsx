import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetFaceCover from "./data/getFaceCover";
import {
  faceCoverClassTableColumn,
  faceCoverNoClassTableColumn,
} from "@/lib/consts/columnConsts";
import AdBanner from "../../custom/adsense/adBanner";
import TableColumn from "@/components/custom/tableColumn/tableColumn";

export default function FaceCover() {
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">얼굴 커버</h1>
      <div className="w-[1200px]">
        <AdBanner
          dataAdFormat={"auto"}
          dataFullWidthResponsive={true}
          dataAdSlot="2690838054"
        />
      </div>
      <TableColumn columnDesign={7} columnData={faceCoverClassTableColumn} />
      <GetFaceCover isClass />
      <TableColumn columnDesign={2} columnData={faceCoverNoClassTableColumn} />
      <GetFaceCover isClass={false} />
    </ContentsWrapper>
  );
}
