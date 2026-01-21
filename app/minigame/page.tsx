import MinigameView from "./_components/minigame-view";

export const metadata = {
  title: "타르코프 미니게임 - EFT Library",
  description:
    "Escape from Tarkov (타르코프) 미니게임으로 게임 매칭 대기시간에 가볍게 할 수 있는 미니게임을 제공합니다.",
  openGraph: {
    siteName: "EFT Library",
    title: "타르코프 미니게임 - EFT Library",
    description:
      "Escape from Tarkov (타르코프) 미니게임으로 게임 매칭 대기시간에 가볍게 할 수 있는 미니게임을 제공합니다.",
    images: "/og.png",
    url: "https://eftlibrary.com/minigame",
  },
  twitter: {
    siteName: "EFT Library",
    title: "타르코프 미니게임 - EFT Library",
    description:
      "Escape from Tarkov (타르코프) 미니게임으로 게임 매칭 대기시간에 가볍게 할 수 있는 미니게임을 제공합니다.",
    images: "/og.png",
    url: "https://eftlibrary.com/minigame",
  },
  alternates: {
    canonical: "https://eftlibrary.com/minigame",
  },
};

export default function Minigame() {
  return <MinigameView />;
}
