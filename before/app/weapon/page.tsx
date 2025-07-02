import Weapon from "@/components/page/weapon/weapon";

export const metadata = {
  title: "타르코프 무기 - EFT Library",
  description:
    "Escape from Tarkov (타르코프) 무기 별 기본 탄약, 발사 모드, 발사 속도, 인체 공학, 수평 반동, 수직 반동, 데미지, 폭발 거리에 대한 정보를 제공합니다.",
  openGraph: {
    siteName: "EFT Library",
    title: "타르코프 무기 - EFT Library",
    description:
      "Escape from Tarkov (타르코프) 무기 별 기본 탄약, 발사 모드, 발사 속도, 인체 공학, 수평 반동, 수직 반동, 데미지, 폭발 거리에 대한 정보를 제공합니다.",
    images: "/og.png",
    url: "https://eftlibrary.com/weapon",
  },
  twitter: {
    siteName: "EFT Library",
    title: "타르코프 무기 - EFT Library",
    description:
      "Escape from Tarkov (타르코프) 무기 별 기본 탄약, 발사 모드, 발사 속도, 인체 공학, 수평 반동, 수직 반동, 데미지, 폭발 거리에 대한 정보를 제공합니다.",
    images: "/og.png",
    url: "https://eftlibrary.com/weapon",
  },
  alternates: {
    canonical: "https://eftlibrary.com/weapon",
  },
};

export default function WeaponPage() {
  return <Weapon />;
}
