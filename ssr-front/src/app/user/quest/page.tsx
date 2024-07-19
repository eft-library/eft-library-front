import PageParent from "@/components/pageParent/pageParent";
import SubHeader from "@/components/subHeader/subHeader";
import UserQuestDetail from "./contents/userQuestDetail";
import type { UserQuest } from "@/types/types";
import "@/assets/quest.css";

export const metadata = {
  title: "퀘스트 플래너 | EFT Library",
  description: "EFT Library",
  keywords: [
    "tarkov",
    "타르코프 퀘스트 공략",
    "타르코프 지도",
    "타르코프",
    "타르코프 정보",
    "타르코프 퀘스트",
    "타르코프 공략",
    "타르코프 하이드아웃 정보",
  ],
  openGraph: {
    siteName: "Escape From Tarkov Library",
    title: "EFT Library",
    description: "EFT Library 퀘스트 플래너",
    images: "/og.png",
    url: "https://eftlibrary.com/user/quest",
  },
};

export default function UserQuest() {
  return (
    <PageParent>
      <SubHeader title="퀘스트 플래너" />
      <UserQuestDetail />
    </PageParent>
  );
}
