import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetColumn from "@/components/custom/getColumn/getColumn";
import { COLUMN_KEY } from "@/lib/consts/columnConsts";
import GetAmmo from "./data/getAmmo";
import GetAmmoSelector from "./data/getAmmoSelector";

export default function Ammo() {
  return (
    <ContentsWrapper>
      <div className="flex flex-col justify-between items-center gap-10 my-10">
        <h1 className="text-white text-4xl font-bold text-center">탄약</h1>
        <GetAmmoSelector />
        <GetColumn columnDesign={11} columnKey={COLUMN_KEY.ammo} isAmmo />
        <GetAmmo />
      </div>
    </ContentsWrapper>
  );
}
