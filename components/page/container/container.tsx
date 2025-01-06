import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetColumn from "@/components/custom/getColumn/getColumn";
import { COLUMN_KEY } from "@/lib/consts/columnConsts";
import GetContainer from "./data/getContainer";
import AdBanner from "../../custom/adsense/adBanner";

export default function Container() {
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">컨테이너</h1>
      <div className="w-full">
        <AdBanner
          dataAdFormat={"auto"}
          dataFullWidthResponsive={true}
          dataAdSlot="2690838054"
        />
      </div>
      <GetColumn columnDesign={4} columnKey={COLUMN_KEY.container} />
      <GetContainer />
    </ContentsWrapper>
  );
}
