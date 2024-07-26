import BossMain from "./contents/bossMain";

export const metadata = {
  title: "타르코프 보스",
  description: "타르코프 보스, tarkov boss",
  openGraph: {
    siteName: "Escape From Tarkov Library",
    title: "EFT Library 보스",
    description: "EFT Library 보스",
    images: "/og.png",
    url: "https://eftlibrary.com/boss",
  },
};

export default function Boss() {
  return <BossMain />;
}
