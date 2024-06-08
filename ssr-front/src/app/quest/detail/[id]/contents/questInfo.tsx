import { Box, Text } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { formatImage } from "@/lib/formatImage";
import type { QuestInfo } from "@/types/types";

export default function QuestInfo({ quest }: QuestInfo) {
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
        backgroundColor={ALL_COLOR.WHITE}
        color={ALL_COLOR.WHITE}
        backgroundImage={`url(${formatImage(quest.image)})`}
        backgroundRepeat={"no-repeat"}
        backgroundSize={"cover"}
        outline={"4px solid"}
        outlineColor={ALL_COLOR.WHITE}
        borderRadius={"lg"}
      />
      <Text
        color={ALL_COLOR.WHITE}
        textAlign={"center"}
        mt={"4"}
        fontWeight={"700"}
        fontSize="lg"
      >
        {quest.title_kr}
      </Text>
      <Text
        color={ALL_COLOR.WHITE}
        textAlign={"center"}
        fontWeight={"700"}
        fontSize="lg"
      >
        {quest.title_en}
      </Text>
      <Text
        color={ALL_COLOR.WHITE}
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
