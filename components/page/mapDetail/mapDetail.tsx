import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetMapDetail from "@/components/page/mapDetail/data/getMapDetail";
import TextSpan from "../../custom/gridContents/textSpan";

export default function MapDetail() {
  return (
    <ContentsWrapper>
      <div className={"flex flex-col justify-center items-center gap-2"}>
        <h1 className="text-white text-4xl font-bold text-center">
          대화형 지도
        </h1>
        <TextSpan isCenter={false} textColor="SunsetYellow">
          (데이터 적재 진행중)
        </TextSpan>
      </div>
      <GetMapDetail />
    </ContentsWrapper>
  );
}
