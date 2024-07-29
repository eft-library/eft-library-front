import PageParent from "@/components/pageParent/pageParent";
import SubHeader from "@/components/subHeader/subHeader";
import { Box } from "@chakra-ui/react";

export default function Forum() {
  return (
    <PageParent>
      <SubHeader title="Forum" />
      <Box mb={10} />
    </PageParent>
  );
}
