import PatchNotesData from "./_components/patch-notes-data";

export const metadata = {
  title: "타르코프 패치노트 - EFT Library",
  description:
    "Escape from Tarkov (타르코프) 패치노트를 한글 번역으로 제공합니다.",
  openGraph: {
    siteName: "EFT Library",
    title: "타르코프 패치노트 - EFT Library",
    description:
      "Escape from Tarkov (타르코프) 패치노트를 한글 번역으로 제공합니다.",
    images: "/og.png",
    url: "https://eftlibrary.com/patch-notes?id=1",
  },
  twitter: {
    siteName: "EFT Library",
    title: "타르코프 패치노트 - EFT Library",
    description:
      "Escape from Tarkov (타르코프) 패치노트를 한글 번역으로 제공합니다.",
    images: "/og.png",
    url: "https://eftlibrary.com/patch-notes?id=1",
  },
  alternates: {
    canonical: "https://eftlibrary.com/patch-notes?id=1",
  },
};

export default function PatchNotes() {
  return <PatchNotesData />;
}
