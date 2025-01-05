import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetColumn from "@/components/custom/getColumn/getColumn";
import { COLUMN_KEY } from "@/lib/consts/columnConsts";
import GetProvisions from "./data/getProvisions";
import AdBanner from "../adsense/adBanner";

export default function Provisions() {
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">식량</h1>
      <div className="w-full">
        <AdBanner
          dataAdFormat={"fluid"}
          dataFullWidthResponsive={true}
          dataAdSlot="2690838054"
        />
      </div>
      <GetColumn
        columnDesign={8}
        columnKey={COLUMN_KEY.provisions}
        isProvision
      />
      <GetProvisions />
    </ContentsWrapper>
  );
}