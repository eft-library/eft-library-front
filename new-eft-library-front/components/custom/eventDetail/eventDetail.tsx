import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetEventDetail from "@/components/custom/eventDetail/data/getEventDetail";

export default function EventDetail() {
    return (
        <ContentsWrapper>
            <div className="flex flex-col justify-between items-center gap-10 my-10">
                <h1 className="text-white text-4xl font-bold text-center">이벤트</h1>
                <GetEventDetail/>
            </div>
        </ContentsWrapper>
    );
}
