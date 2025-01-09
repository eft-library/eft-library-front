import Quest from "@/components/page/quest/quest";

export const metadata = {
  title: "타르코프 퀘스트 - EFT Library",
  description:
    "Escape from Tarkov (타르코프) 전체 퀘스트. 프라퍼, 테라피스트, 펜스, 스키어, 피스키퍼, 메카닉, 래그맨, 예거, 등대지기, 레프의 퀘스트와 목표, 보상, 카파 정보를 제공합니다.",
  openGraph: {
    siteName: "EFT Library",
    title: "타르코프 퀘스트 - EFT Library",
    description:
      "Escape from Tarkov (타르코프) 전체 퀘스트. 프라퍼, 테라피스트, 펜스, 스키어, 피스키퍼, 메카닉, 래그맨, 예거, 등대지기, 레프의 퀘스트와 목표, 보상, 카파 정보를 제공합니다.",
    images: "/og.png",
    url: "https://eftlibrary.com/quest",
  },
  twitter: {
    siteName: "EFT Library",
    title: "타르코프 퀘스트 - EFT Library",
    description:
      "Escape from Tarkov (타르코프) 전체 퀘스트. 프라퍼, 테라피스트, 펜스, 스키어, 피스키퍼, 메카닉, 래그맨, 예거, 등대지기, 레프의 퀘스트와 목표, 보상, 카파 정보를 제공합니다.",
    images: "/og.png",
    url: "https://eftlibrary.com/quest",
  },
};

export default function QuestPage() {
  return <Quest />;
}
