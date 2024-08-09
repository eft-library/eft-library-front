import SubHeader from "@/components/subHeader/subHeader";
import PageParent from "@/components/pageParent/pageParent";
import { Box } from "@chakra-ui/react";
import ContainerDetail from "./contents/containerDetail";

export const metadata = {
  title: "타르코프 컨테이너",
  description: "타르코프 컨테이너, tarkov container",
  openGraph: {
    siteName: "Escape From Tarkov Library",
    title: "EFT Library 컨테이너",
    description: "EFT Library 컨테이너",
    images: "/og.png",
    url: "https://eftlibrary.com/container",
  },
};

export default function Container() {
  return (
    <PageParent>
      <SubHeader title="컨테이너" />
      <Box mb={10} />
      <ContainerDetail />
    </PageParent>
  );
}
