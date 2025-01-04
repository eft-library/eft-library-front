import UserQuest from "@/components/custom/userQuest/userQuest";

export const metadata = {
  title: "퀘스트 플래너 | EFT Library",
  description: "EFT Library",
  openGraph: {
    siteName: "Escape From Tarkov Library",
    title: "EFT Library 퀘스트 플래너",
    description: "EFT Library 퀘스트 플래너",
    images: "/og.png",
    url: "https://eftlibrary.com/user/quest",
  },
};

export default function UserQuestPage() {
  return <UserQuest />;
}
