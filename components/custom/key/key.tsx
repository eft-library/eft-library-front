import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetColumn from "@/components/custom/getColumn/getColumn";
import { COLUMN_KEY } from "@/lib/consts/columnConsts";
import GetKey from "./data/getKey";
import GetKeySelector from "./data/getKeySelector";
import AdBanner from "../adsense/adBanner";

export default function Key() {
  return (
    <ContentsWrapper>
      <div className="flex flex-col justify-between items-center gap-10 my-10">
        <h1 className="text-white text-4xl font-bold text-center">열쇠</h1>
        <div className="w-full">
          <AdBanner
            dataAdFormat={"fluid"}
            dataFullWidthResponsive={true}
            dataAdSlot="2690838054"
          />
        </div>
        <GetKeySelector />
        <GetColumn columnDesign={5} columnKey={COLUMN_KEY.key} />
        <GetKey />
      </div>
    </ContentsWrapper>
  );
}
