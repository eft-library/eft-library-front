import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetUserQuest from "@/components/custom/userQuest/data/getUserQuest";

export default function UserQuest() {
    return (
        <ContentsWrapper>
            <div className="flex flex-col justify-between items-center gap-10 my-10">
                <h1 className="text-white text-4xl font-bold text-center">퀘스트 플래너</h1>
                <GetUserQuest />
            </div>
        </ContentsWrapper>
    );
}
