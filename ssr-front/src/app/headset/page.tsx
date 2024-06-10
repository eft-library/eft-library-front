"use client";

import SubHeader from "@/components/subHeader/subHeader";
import PageParent from "@/components/pageParent/pageParent";
import { Box } from "@chakra-ui/react";
import HeadsetDetail from "./contents/headsetDetail";

export default function Headset() {
  return (
    <PageParent>
      <SubHeader title="헤드셋" />
      <Box mb={10} />
      <HeadsetDetail />
    </PageParent>
  );
}
