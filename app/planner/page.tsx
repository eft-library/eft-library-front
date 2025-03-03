import Planner from "@/components/page/planner/planner";

export const dynamic = "force-dynamic";

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
    url: "https://eftlibrary.com/planner",
  },
  twitter: {
    siteName: "EFT Library",
    title: "타르코프 퀘스트 플래너 - EFT Library",
    description:
      "Escape from Tarkov (타르코프) 게임 내 임무 진행 상황을 추가, 저장하고 완료 시 다음 퀘스트 정보를 제공합니다.",
    images: "/og.png",
    url: "https://eftlibrary.com/planner",
  },
  alternates: {
    canonical: "https://eftlibrary.com/planner",
  },
};

export default function PlannerPage() {
  return <Planner />;
}
