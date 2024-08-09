import SubHeader from "@/components/subHeader/subHeader";
import PageParent from "@/components/pageParent/pageParent";
import { Box } from "@chakra-ui/react";
import PatchNotesDetail from "./contents/patchNotesDetail";

export const metadata = {
  title: "타르코프 패치노트",
  description: "타르코프 패치노트, tarkov event",
  openGraph: {
    siteName: "Escape From Tarkov Library",
    title: "EFT Library 패치노트",
    description: "EFT Library 패치노트",
    images: "/og.png",
    url: "https://eftlibrary.com/patch-notes",
  },
};

export default function PatchNotes() {
  return (
    <PageParent>
      <SubHeader title="패치노트" />
      <Box mb={10} />
      <PatchNotesDetail />
    </PageParent>
  );
}
