import SubHeader from "@/components/subHeader/subHeader";
import PageParent from "@/components/pageParent/pageParent";
import { Box } from "@chakra-ui/react";
import dynamic from "next/dynamic";

const ContainerDetail = dynamic(() => import("./contents/containerDetail"), {
  ssr: false,
});

export default function Container() {
  return (
    <PageParent>
      <SubHeader title="컨테이너" />
      <Box mb={10} />
      <ContainerDetail />
    </PageParent>
  );
}
