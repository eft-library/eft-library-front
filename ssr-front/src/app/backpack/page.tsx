import SubHeader from "@/components/subHeader/subHeader";
import PageParent from "@/components/pageParent/pageParent";
import { Box } from "@chakra-ui/react";
import dynamic from "next/dynamic";

const BackpackDetail = dynamic(() => import("./contents/backpackDetail"), {
  ssr: false,
});

export default function Backpack() {
  return (
    <PageParent>
      <SubHeader title="가방" />
      <Box mb={10} />
      <BackpackDetail />
    </PageParent>
  );
}
