import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetColumn from "@/components/custom/getColumn/getColumn";
import { COLUMN_KEY } from "@/lib/consts/columnConsts";
import GetContainer from "./data/getContainer";
import AdBanner from "../adsense/adBanner";

export default function Container() {
  return (
    <ContentsWrapper>
      <div className="flex flex-col justify-between items-center gap-10 my-10">
        <h1 className="text-white text-4xl font-bold text-center">컨테이너</h1>
        <AdBanner
          dataAdFormat={"fluid"}
          dataFullWidthResponsive={true}
          dataAdSlot="2690838054"
        />
        <GetColumn columnDesign={4} columnKey={COLUMN_KEY.container} />
        <GetContainer />
      </div>
    </ContentsWrapper>
  );
}
