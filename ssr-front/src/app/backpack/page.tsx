"use client";

import SubHeader from "@/components/subHeader/subHeader";
import PageParent from "@/components/pageParent/pageParent";
import { Box } from "@chakra-ui/react";
import BackpackDetail from "./contents/backpackDetail";

export default function Backpack() {
  return (
    <PageParent>
      <SubHeader title="가방" />
      <Box mb={10} />
      <BackpackDetail />
    </PageParent>
  );
}
