import SubHeader from "@/components/subHeader/subHeader";
import PageParent from "@/components/pageParent/pageParent";
import { Box } from "@chakra-ui/react";
import GlassesDetail from "./contents/glassesDetail";
import AdBanner from "@/components/adsense/adBanner";

export const metadata = {
  title: "타르코프 안경",
  description: "타르코프 안경, tarkov glasses, tarkov eyewear",
  openGraph: {
    siteName: "Escape From Tarkov Library",
    title: "EFT Library 안경",
    description: "EFT Library 안경",
    images: "/og.png",
    url: "https://eftlibrary.com/glasses",
  },
};

export default function Glasses() {
  return (
    <PageParent>
      <SubHeader title="안경" />
      <Box mb={10} />
      <AdBanner
        dataAdFormat={"fluid"}
        dataFullWidthResponsive={true}
        dataAdSlot="2690838054"
      />
      <Box mb={10} />
      <GlassesDetail />
    </PageParent>
  );
}
