import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetFaceCover from "./data/getFaceCover";
import GetColumn from "../../custom/getColumn/getColumn";
import { COLUMN_KEY } from "@/lib/consts/columnConsts";
import AdBanner from "../../custom/adsense/adBanner";

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
      <GetColumn columnDesign={7} columnKey={COLUMN_KEY.faceCoverClass} />
      <GetFaceCover isClass />
      <GetColumn columnDesign={2} columnKey={COLUMN_KEY.faceCoverNoClass} />
      <GetFaceCover isClass={false} />
    </ContentsWrapper>
  );
}
