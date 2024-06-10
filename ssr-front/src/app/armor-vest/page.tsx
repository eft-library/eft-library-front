"use client";

import SubHeader from "@/components/subHeader/subHeader";
import PageParent from "@/components/pageParent/pageParent";
import { Box } from "@chakra-ui/react";
import ArmorVestDetail from "./contents/armorVestDetail";

export default function ArmorVest() {
  return (
    <PageParent>
      <SubHeader title="방탄 조끼" />
      <Box mb={10} />
      <ArmorVestDetail />
    </PageParent>
  );
}
