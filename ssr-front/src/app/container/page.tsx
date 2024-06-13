"use client";

import SubHeader from "@/components/subHeader/subHeader";
import PageParent from "@/components/pageParent/pageParent";
import { Box } from "@chakra-ui/react";
import ContainerDetail from "./contents/containerDetail";

export default function Container() {
  return (
    <PageParent>
      <SubHeader title="컨테이너" />
      <Box mb={10} />
      <ContainerDetail />
    </PageParent>
  );
}
