import SubHeader from "@/components/subHeader/subHeader";
import PageParent from "@/components/pageParent/pageParent";
import { Box } from "@chakra-ui/react";
import FaceCoverDetail from "./contents/faceCoverDetail";
import AdBanner from "@/components/adsense/adBanner";

export const metadata = {
  title: "타르코프 얼굴 커버",
  description: "타르코프 얼굴 커버, tarkov face cover",
  openGraph: {
    siteName: "Escape From Tarkov Library",
    title: "EFT Library 얼굴 커버",
    description: "EFT Library 얼굴 커버",
    images: "/og.png",
    url: "https://eftlibrary.com/face-cover",
  },
};

export default function FaceCover() {
  return (
    <PageParent>
      <SubHeader title="얼굴 커버" />
      <Box mb={10} />
      <AdBanner
        dataAdFormat={"fluid"}
        dataFullWidthResponsive={true}
        dataAdSlot="2690838054"
      />
      <Box mb={10} />
      <FaceCoverDetail />
    </PageParent>
  );
}
