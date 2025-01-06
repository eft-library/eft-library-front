import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetWeaponSelector from "./data/getWeaponSelector";
import GetWeapon from "./data/getWeapon";
import AdBanner from "../../custom/adsense/adBanner";

export default function Weapon() {
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">무기</h1>
      <div className="w-full">
        <AdBanner
          dataAdFormat={"auto"}
          dataFullWidthResponsive={true}
          dataAdSlot="2690838054"
        />
      </div>
      <GetWeaponSelector />
      <GetWeapon />
    </ContentsWrapper>
  );
}
