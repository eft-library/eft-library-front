import { COLUMN_KEY } from "@/lib/consts/columnConsts";
import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetColumn from "../getColumn/getColumn";
import GetHideout from "@/components/custom/hideout/data/getHideout";
import GetHideoutSelector from "@/components/custom/hideout/data/getHideoutSelector";
import AdBanner from "../adsense/adBanner";

export default function Hideout() {
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">은신처</h1>
      <div className="w-full">
        <AdBanner
          dataAdFormat={"auto"}
          dataFullWidthResponsive={true}
          dataAdSlot="2690838054"
        />
      </div>
      <GetHideoutSelector />
      <GetColumn columnKey={COLUMN_KEY.hideout} columnDesign={5} isHideout />
      <GetHideout />
    </ContentsWrapper>
  );
}
