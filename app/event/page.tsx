import Event from "@/components/custom/event/event";

export const metadata = {
  title: "타르코프 이벤트",
  description: "타르코프 이벤트, tarkov event",
  openGraph: {
    siteName: "Escape From Tarkov Library",
    title: "EFT Library 이벤트",
    description: "EFT Library 이벤트",
    images: "/og.png",
    url: "https://eftlibrary.com/event?id=1",
  },
};

export default function EventPage() {
  return <Event />;
}
