"use client";

import { Box, Text } from "@chakra-ui/react";
import { formatImage } from "@/lib/formatImage";
import type { QuestInfo } from "@/types/types";
import InfoSkeleton from "../../skeleton/infoSkeleton";
import useColorValue from "@/hooks/useColorValue";

export default function QuestInfo({ quest }: QuestInfo) {
  const { blackWhite } = useColorValue();
  if (!quest) return <InfoSkeleton />;

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent="center"
      alignItems={"center"}
    >
      <Box
        w="160px"
        h="160px"
        backgroundColor={blackWhite}
        color={blackWhite}
        backgroundImage={`url(${formatImage(quest.image)})`}
        backgroundRepeat={"no-repeat"}
        backgroundSize={"cover"}
        outline={"4px solid"}
        outlineColor={blackWhite}
        borderRadius={"lg"}
      />
      <Text
        color={blackWhite}
        textAlign={"center"}
        mt={"4"}
        fontWeight={"700"}
        fontSize="lg"
      >
        {quest.title_kr}
      </Text>
      <Text
        color={blackWhite}
        textAlign={"center"}
        fontWeight={"700"}
        fontSize="lg"
      >
        {quest.title_en}
      </Text>
      <Text
        color={blackWhite}
        textAlign={"center"}
        mt={"1"}
        fontSize="md"
        fontWeight={"600"}
      >
        {quest.required_kappa ? "✅" : "❌"}&nbsp;&nbsp;&nbsp;Kappa
      </Text>
    </Box>
  );
}
