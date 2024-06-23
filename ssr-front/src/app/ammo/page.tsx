"use client";

import SubHeader from "@/components/subHeader/subHeader";
import PageParent from "@/components/pageParent/pageParent";
import { Box } from "@chakra-ui/react";

export default function Ammo() {
  return (
    <PageParent>
      <SubHeader title="총알" />
      <Box mb={10} />
    </PageParent>
  );
}
