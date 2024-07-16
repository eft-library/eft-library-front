import SubHeader from "@/components/subHeader/subHeader";
import PageParent from "@/components/pageParent/pageParent";
import { Box } from "@chakra-ui/react";
import dynamic from "next/dynamic";

const HeadWearDetail = dynamic(() => import("./contents/headwearDetail"), {
  ssr: false,
});

export default function HeadWear() {
  return (
    <PageParent>
      <SubHeader title="방탄모" />
      <Box mb={10} />
      <HeadWearDetail />
    </PageParent>
  );
}
