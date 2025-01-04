import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetMapDetail from "@/components/custom/mapDetail/data/getMapDetail";
import GetMapSelector from "@/components/custom/mapDetail/data/getMapSelector";

export default function MapDetail() {
  return (
    <ContentsWrapper>
      <div className="flex flex-col justify-between items-center gap-10 my-10">
        <div className={"flex flex-col justify-center items-center gap-2"}>
          <h1 className="text-white text-4xl font-bold text-center">
            대화형 지도
          </h1>
          <span className={"font-bold text-SunsetYellow"}>
            (데이터 적재 진행중)
          </span>
        </div>
        <GetMapSelector />
        <GetMapDetail />
      </div>
    </ContentsWrapper>
  );
}
