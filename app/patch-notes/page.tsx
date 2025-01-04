import PatchNotes from "@/components/custom/patchNotes/patchNotes";

export const metadata = {
  title: "타르코프 패치노트",
  description: "타르코프 패치노트, tarkov event",
  openGraph: {
    siteName: "Escape From Tarkov Library",
    title: "EFT Library 패치노트",
    description: "EFT Library 패치노트",
    images: "/og.png",
    url: "https://eftlibrary.com/patch-notes?id=1",
  },
};

export default function PatchNotesPage() {
  return <PatchNotes />;
}
