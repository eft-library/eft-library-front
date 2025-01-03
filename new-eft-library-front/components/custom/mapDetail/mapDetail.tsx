import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetMapDetail from "@/components/custom/mapDetail/data/getMapDetail";
import GetMapSelector from "@/components/custom/mapDetail/data/getMapSelector";

export default function MapDetail() {
    return (
        <ContentsWrapper>
            <div className="flex flex-col justify-between items-center gap-10 my-10">
                <h1 className="text-white text-4xl font-bold text-center">대화형 지도</h1>
                <GetMapSelector/>
                <GetMapDetail/>
            </div>
        </ContentsWrapper>
    );
}
