import UserQuest from "@/components/page/userQuest/userQuest";

export const metadata = {
  title: "타르코프 퀘스트 플래너 - EFT Library",
  description:
    "Escape from Tarkov (타르코프) 게임 내 임무 진행 상황을 추가, 저장하고 완료 시 다음 퀘스트 정보를 제공합니다.",
  openGraph: {
    siteName: "EFT Library",
    title: "타르코프 퀘스트 플래너 - EFT Library",
    description:
      "Escape from Tarkov (타르코프) 게임 내 임무 진행 상황을 추가, 저장하고 완료 시 다음 퀘스트 정보를 제공합니다.",
    images: "/og.png",
    url: "https://eftlibrary.com/user/quest",
  },
  twitter: {
    siteName: "EFT Library",
    title: "타르코프 퀘스트 플래너 - EFT Library",
    description:
      "Escape from Tarkov (타르코프) 게임 내 임무 진행 상황을 추가, 저장하고 완료 시 다음 퀘스트 정보를 제공합니다.",
    images: "/og.png",
    url: "https://eftlibrary.com/user/quest",
  },
};

export default function UserQuestPage() {
  return <UserQuest />;
}
