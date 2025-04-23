import Ammo from "@/components/page/ammo/ammo";

export const metadata = {
  title: "타르코프 탄약 - EFT Library",
  description:
    "Escape from Tarkov (타르코프) 탄약 별 탄약표, 데미지, 관통력, 방어구 피해, 정확성, 반동, 출혈, 방탄 등급별 총알 효율성에 대한 정보를 제공합니다.",
  openGraph: {
    siteName: "EFT Library",
    title: "타르코프 탄약 - EFT Library",
    description:
      "Escape from Tarkov (타르코프) 탄약 별 탄약표, 데미지, 관통력, 방어구 피해, 정확성, 반동, 출혈, 방탄 등급별 총알 효율성에 대한 정보를 제공합니다.",
    images: "/og.png",
    url: "https://eftlibrary.com/ammo",
  },
  twitter: {
    siteName: "EFT Library",
    title: "타르코프 탄약 - EFT Library",
    description:
      "Escape from Tarkov (타르코프) 탄약 별 탄약표, 데미지, 관통력, 방어구 피해, 정확성, 반동, 출혈, 방탄 등급별 총알 효율성에 대한 정보를 제공합니다.",
    images: "/og.png",
    url: "https://eftlibrary.com/ammo",
  },
  alternates: {
    canonical: "https://eftlibrary.com/ammo",
  },
};

export default function AmmoPage() {
  return <Ammo />;
}
