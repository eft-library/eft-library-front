import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import { keyTableColumn } from "@/lib/consts/columnConsts";
import GetKey from "./data/getKey";
import KeySelectorClient from "./data/keySelectorClient";
import AdBanner from "../../custom/adsense/adBanner";
import TableColumn from "@/components/custom/tableColumn/tableColumn";

export default function Key() {
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">열쇠</h1>
      <div className="w-[1200px]">
        <AdBanner
          dataAdFormat={"auto"}
          dataFullWidthResponsive={true}
          dataAdSlot="2690838054"
        />
      </div>
      <KeySelectorClient />
      <TableColumn columnDesign={4} columnData={keyTableColumn} />
      <GetKey />
    </ContentsWrapper>
  );
}
