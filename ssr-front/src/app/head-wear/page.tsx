import SubHeader from "@/components/subHeader/subHeader";
import PageParent from "@/components/pageParent/pageParent";
import { Box } from "@chakra-ui/react";
import HeadWearDetail from "./detail/headwearDetail";

export default function HeadWear() {
  return (
    <PageParent>
      <SubHeader title="방탄모" />
      <Box mb={10} />
      <HeadWearDetail />
    </PageParent>
  );
}
