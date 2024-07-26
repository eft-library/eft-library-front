import SubHeader from "@/components/subHeader/subHeader";
import PageParent from "@/components/pageParent/pageParent";
import { Box } from "@chakra-ui/react";
import HeadsetDetail from "./contents/headsetDetail";

export const metadata = {
  title: "타르코프 헤드셋",
  description: "타르코프 헤드셋, tarkov headset",
  openGraph: {
    siteName: "Escape From Tarkov Library",
    title: "EFT Library 헤드셋",
    description: "EFT Library 헤드셋",
    images: "/og.png",
    url: "https://eftlibrary.com/headset",
  },
};

export default function Headset() {
  return (
    <PageParent>
      <SubHeader title="헤드셋" />
      <Box mb={10} />
      <HeadsetDetail />
    </PageParent>
  );
}
