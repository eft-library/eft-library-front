import SubHeader from "@/components/subHeader/subHeader";
import PageParent from "@/components/pageParent/pageParent";
import { Box } from "@chakra-ui/react";
import ArmBandDetail from "./contents/armBandDetail";
import AdBanner from "@/components/adsense/adBanner";

export const metadata = {
  title: "타르코프 완장",
  description: "타르코프 완장, tarkov arm band",
  openGraph: {
    siteName: "Escape From Tarkov Library",
    title: "EFT Library 완장",
    description: "EFT Library 완장",
    images: "/og.png",
    url: "https://eftlibrary.com/arm-band",
  },
};

export default function ArmBand() {
  return (
    <PageParent>
      <SubHeader title="완장" />
      <Box mb={10} />
      <AdBanner
        dataAdFormat={"fluid"}
        dataFullWidthResponsive={true}
        dataAdSlot="2690838054"
      />
      <Box mb={10} />
      <ArmBandDetail />
    </PageParent>
  );
}
