import SubHeader from "@/components/subHeader/subHeader";
import PageParent from "@/components/pageParent/pageParent";
import { Box } from "@chakra-ui/react";
import BackpackDetail from "./contents/backpackDetail";

export const metadata = {
  title: "타르코프 가방",
  description: "타르코프 가방, tarkov backpack",
  openGraph: {
    siteName: "Escape From Tarkov Library",
    title: "EFT Library 가방",
    description: "EFT Library 가방",
    images: "/og.png",
    url: "https://eftlibrary.com/backpack",
  },
};

export default function Backpack() {
  return (
    <PageParent>
      <SubHeader title="가방" />
      <Box mb={10} />
      <BackpackDetail />
    </PageParent>
  );
}
