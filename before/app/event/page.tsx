import Event from "@/components/page/event/event";

export const metadata = {
  title: "타르코프 이벤트 - EFT Library",
  description:
    "Escape from Tarkov (타르코프)에서 진행하는 이벤트에 관한 정보를 제공합니다.",
  openGraph: {
    siteName: "EFT Library",
    title: "타르코프 이벤트 - EFT Library",
    description:
      "Escape from Tarkov (타르코프)에서 진행하는 이벤트에 관한 정보를 제공합니다.",
    images: "/og.png",
    url: "https://eftlibrary.com/event?id=1",
  },
  twitter: {
    siteName: "EFT Library",
    title: "타르코프 이벤트 - EFT Library",
    description:
      "Escape from Tarkov (타르코프)에서 진행하는 이벤트에 관한 정보를 제공합니다.",
    images: "/og.png",
    url: "https://eftlibrary.com/event?id=1",
  },
  alternates: {
    canonical: "https://eftlibrary.com/event?id=1",
  },
};

export default function EventPage() {
  return <Event />;
}
