import SubHeader from "@/components/subHeader/subHeader";
import PageParent from "@/components/pageParent/pageParent";
import { Box } from "@chakra-ui/react";
import dynamic from "next/dynamic";

const ProvisionsDetail = dynamic(() => import("./contents/provisionsDetail"), {
  ssr: false,
});

export default function Provisions() {
  return (
    <PageParent>
      <SubHeader title="음식" />
      <Box mb={10} />
      <ProvisionsDetail />
    </PageParent>
  );
}
