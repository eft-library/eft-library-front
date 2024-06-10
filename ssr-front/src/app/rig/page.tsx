"use client";

import SubHeader from "@/components/subHeader/subHeader";
import PageParent from "@/components/pageParent/pageParent";
import { Box } from "@chakra-ui/react";
import RigDetail from "./contents/rigDetail";

export default function Rig() {
  return (
    <PageParent>
      <SubHeader title="전술 조끼" />
      <Box mb={10} />
      <RigDetail />
    </PageParent>
  );
}
