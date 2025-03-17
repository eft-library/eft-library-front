import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetColumn from "@/components/custom/getColumn/getColumn";
import { COLUMN_KEY } from "@/lib/consts/columnConsts";
import GetAmmo from "./data/getAmmo";
import GetAmmoSelector from "./data/getAmmoSelector";
import AdBanner from "../../custom/adsense/adBanner";

export default function Ammo() {
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">탄약</h1>
      <div className="w-[1200px]">
        <AdBanner
          dataAdFormat={"auto"}
          dataFullWidthResponsive={true}
          dataAdSlot="2690838054"
        />
      </div>
      <GetAmmoSelector />
      <GetColumn columnDesign={12} columnKey={COLUMN_KEY.ammo} isAmmo />
      <GetAmmo />
    </ContentsWrapper>
  );
}
