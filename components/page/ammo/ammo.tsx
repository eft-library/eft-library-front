import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetAmmo from "./data/getAmmo";
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
      <GetAmmo />
    </ContentsWrapper>
  );
}
