import HideoutStation from "@/components/page/hideoutStation/hideoutStation";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "타르코프 은신처 - EFT Library",
  description:
    "Escape from Tarkov (타르코프) 은신처 기능, 건설 시 필요 아이템, 건설 시간에 대한 정보를 제공합니다.",
  openGraph: {
    siteName: "EFT Library",
    title: "타르코프 은신처 - EFT Library",
    description:
      "Escape from Tarkov (타르코프) 은신처 기능, 건설 시 필요 아이템, 건설 시간에 대한 정보를 제공합니다.",
    images: "/og.png",
    url: "https://eftlibrary.com/hideout-station",
  },
  twitter: {
    siteName: "EFT Library",
    title: "타르코프 은신처 - EFT Library",
    description:
      "Escape from Tarkov (타르코프) 은신처 기능, 건설 시 필요 아이템, 건설 시간에 대한 정보를 제공합니다.",
    images: "/og.png",
    url: "https://eftlibrary.com/hideout-station",
  },
  alternates: {
    canonical: "https://eftlibrary.com/hideout-station",
  },
};

export default function HideoutStationPage() {
  return <HideoutStation />;
}
