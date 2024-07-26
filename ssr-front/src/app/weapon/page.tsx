import WeaponMain from "./contents/weaponMain";

export const metadata = {
  title: "타르코프 무기",
  description: "타르코프 무기, 타르코프 총, tarkov weapon, tarkov gun",
  openGraph: {
    siteName: "Escape From Tarkov Library",
    title: "EFT Library 무기",
    description: "EFT Library 무기",
    images: "/og.png",
    url: "https://eftlibrary.com/weapon",
  },
};

export default function Weapon() {
  return <WeaponMain />;
}
