import SubHeader from "@/components/subHeader/subHeader";
import PageParent from "@/components/pageParent/pageParent";
import { Box } from "@chakra-ui/react";
import ProvisionsGetData from "./contents/provisionsGetData";
import AdBanner from "@/components/adsense/adBanner";

export const metadata = {
  title: "타르코프 식량",
  description: "타르코프 식량, tarkov provisions, tarkov food",
  openGraph: {
    siteName: "Escape From Tarkov Library",
    title: "EFT Library 식량",
    description: "EFT Library 식량",
    images: "/og.png",
    url: "https://eftlibrary.com/provisions",
  },
};

export default function Provisions() {
  return (
    <PageParent>
      <SubHeader title="식량" />
      <Box mb={10} />
      <AdBanner
        dataAdFormat={"fluid"}
        dataFullWidthResponsive={true}
        dataAdSlot="2690838054"
      />
      <Box mb={10} />
      <ProvisionsGetData />
    </PageParent>
  );
}
