import SubHeader from "@/components/subHeader/subHeader";
import PageParent from "@/components/pageParent/pageParent";
import { Box } from "@chakra-ui/react";
import ArmorVestDetail from "./contents/armorVestDetail";
import AdBanner from "@/components/adsense/adBanner";

export const metadata = {
  title: "타르코프 방탄 조끼",
  description: "타르코프 방탄 조끼 , tarkov armor vest",
  openGraph: {
    siteName: "Escape From Tarkov Library",
    title: "EFT Library 방탄 조끼",
    description: "EFT Library 방탄 조끼",
    images: "/og.png",
    url: "https://eftlibrary.com/armor-vest",
  },
};

export default function ArmorVest() {
  return (
    <PageParent>
      <SubHeader title="방탄 조끼" />
      <Box mb={10} />
      <AdBanner
        dataAdFormat={"fluid"}
        dataFullWidthResponsive={true}
        dataAdSlot="2690838054"
      />
      <Box mb={10} />
      <ArmorVestDetail />
    </PageParent>
  );
}
