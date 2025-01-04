import Headset from "@/components/custom/headset/headset";

export const metadata = {
  title: "타르코프 헤드셋",
  description: "타르코프 헤드셋, tarkov headset",
  openGraph: {
    siteName: "Escape From Tarkov Library",
    title: "EFT Library 헤드셋",
    description: "EFT Library 헤드셋",
    images: "/og.png",
    url: "https://eftlibrary.com/headset",
  },
};

export default function HeadsetPage() {
  return <Headset />;
}
