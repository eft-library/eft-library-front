import SubHeader from "@/components/subHeader/subHeader";
import PageParent from "@/components/pageParent/pageParent";
import { Box } from "@chakra-ui/react";
import RigDetail from "./contents/rigDetail";

export const metadata = {
  title: "타르코프 전술 조끼",
  description: "타르코프 전술 조끼, tarkov rig, tarkov rigs",
  openGraph: {
    siteName: "Escape From Tarkov Library",
    title: "EFT Library 전술 조끼",
    description: "EFT Library 전술 조끼",
    images: "/og.png",
    url: "https://eftlibrary.com/rig",
  },
};

export default function Rig() {
  return (
    <PageParent>
      <SubHeader title="전술 조끼" />
      <Box mb={10} />
      <RigDetail />
    </PageParent>
  );
}
