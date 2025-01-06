import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetRig from "./data/getRig";
import GetColumn from "../getColumn/getColumn";
import { COLUMN_KEY } from "@/lib/consts/columnConsts";
import AdBanner from "../adsense/adBanner";

export default function Rig() {
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">전술 조끼</h1>
      <div className="w-full flex justify-center items-center">
        <AdBanner
          dataAdFormat={"auto"}
          dataFullWidthResponsive={true}
          dataAdSlot="2690838054"
        />
      </div>
      <GetColumn columnDesign={7} columnKey={COLUMN_KEY.rigClass} />
      <GetRig isClass />
      <GetColumn columnDesign={4} columnKey={COLUMN_KEY.rigNoClass} />
      <GetRig isClass={false} />
    </ContentsWrapper>
  );
}
