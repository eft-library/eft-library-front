import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetColumn from "@/components/custom/getColumn/getColumn";
import { COLUMN_KEY } from "@/lib/consts/columnConsts";
import GetArmorVest from "./data/getArmorVest";
import AdBanner from "../adsense/adBanner";

export default function ArmorVest() {
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">방탄 조끼</h1>
      <div className="w-full flex justify-center items-center">
        <AdBanner
          dataAdFormat={"auto"}
          dataFullWidthResponsive={true}
          dataAdSlot="2690838054"
        />
      </div>
      <GetColumn columnDesign={6} columnKey={COLUMN_KEY.armorVest} />
      <GetArmorVest />
    </ContentsWrapper>
  );
}
