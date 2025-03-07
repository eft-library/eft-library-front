import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetMapOfTarkov from "./data/getMapOfTarkov";

export default function MapOfTarkov() {
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">
        타르코프 지도
      </h1>
      <GetMapOfTarkov />
    </ContentsWrapper>
  );
}
