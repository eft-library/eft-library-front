import Quest from "@/components/page/quest/quest";

export const metadata = {
  title: "타르코프 퀘스트",
  description: "타르코프 퀘스트, tarkov quest",
  openGraph: {
    siteName: "Escape From Tarkov Library",
    title: "EFT Library 퀘스트",
    description: "EFT Library 퀘스트",
    images: "/og.png",
    url: "https://eftlibrary.com/quest",
  },
};

export default function QuestPage() {
  return <Quest />;
}
