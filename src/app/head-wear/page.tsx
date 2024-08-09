import SubHeader from "@/components/subHeader/subHeader";
import PageParent from "@/components/pageParent/pageParent";
import { Box } from "@chakra-ui/react";
import HeadWearDetail from "./contents/headwearDetail";

export const metadata = {
  title: "타르코프 방탄모",
  description: "타르코프 방탄모, tarkov headwear, tarkov helmet",
  openGraph: {
    siteName: "Escape From Tarkov Library",
    title: "EFT Library 방탄모",
    description: "EFT Library 방탄모",
    images: "/og.png",
    url: "https://eftlibrary.com/head-wear",
  },
};

export default function HeadWear() {
  return (
    <PageParent>
      <SubHeader title="방탄모" />
      <Box mb={10} />
      <HeadWearDetail />
    </PageParent>
  );
}
