import HideoutMain from "./contents/hideoutMain";

export const metadata = {
  title: "타르코프 은신처",
  description: "타르코프 은신처, 타르코프 하이드아웃, tarkov hideout",
  openGraph: {
    siteName: "Escape From Tarkov Library",
    title: "EFT Library 은신처",
    description: "EFT Library 은신처",
    images: "/og.png",
    url: "https://eftlibrary.com/hideout",
  },
};

export default function Hideout() {
  return <HideoutMain />;
}
