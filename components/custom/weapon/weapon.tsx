import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetWeaponSelector from "./data/getWeaponSelector";
import GetWeapon from "./data/getWeapon";
import AdBanner from "../adsense/adBanner";

export default function Weapon() {
  return (
    <ContentsWrapper>
      <div className="flex flex-col justify-between items-center gap-10 my-10">
        <h1 className="text-white text-4xl font-bold text-center">무기</h1>
        <div className="w-full">
          <AdBanner
            dataAdFormat={"fluid"}
            dataFullWidthResponsive={true}
            dataAdSlot="2690838054"
          />
        </div>
        <GetWeaponSelector />
        <GetWeapon />
      </div>
    </ContentsWrapper>
  );
}
