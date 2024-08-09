import KeyMain from "./contents/keyMain";

export const metadata = {
  title: "타르코프 열쇠",
  description: "타르코프 열쇠, tarkov key",
  openGraph: {
    siteName: "Escape From Tarkov Library",
    title: "EFT Library 열쇠",
    description: "EFT Library 열쇠",
    images: "/og.png",
    url: "https://eftlibrary.com/key",
  },
};

export default function Key() {
  return <KeyMain />;
}
