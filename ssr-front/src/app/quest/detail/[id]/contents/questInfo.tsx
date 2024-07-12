import { Box, Text, Flex } from "@chakra-ui/react";
import { formatImage } from "@/lib/formatImage";
import type { QuestInfo } from "@/types/types";
import InfoSkeleton from "../../skeleton/infoSkeleton";
import Link from "next/link";
import { ALL_COLOR } from "@/util/consts/colorConsts";

export default function QuestInfo({ quest }: QuestInfo) {
  if (!quest) return <InfoSkeleton />;

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent="center"
      alignItems={"center"}
      w={"100%"}
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
      <Flex
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        mt={4}
        w={"100%"}
      >
        <Box display={"flex"} flexDirection={"column"} w={"50%"}>
          <Text
            color={ALL_COLOR.YELLOW}
            fontWeight={"700"}
            fontSize="md"
            textAlign={"center"}
            mb={2}
          >
            이전
          </Text>
          {quest.requires && quest.requires.length > 0 ? (
            quest.requires.map((item) => (
              <Text
                key={item.id}
                color={ALL_COLOR.WHITE}
                fontWeight={"700"}
                textAlign={"center"}
                cursor={"pointer"}
                _hover={{ color: ALL_COLOR.YELLOW }}
                mb={1}
              >
                <Link href={`/quest/detail/${item.id}`}>{item.name_kr}</Link>
              </Text>
            ))
          ) : (
            <Text
              color={ALL_COLOR.WHITE}
              fontWeight={"700"}
              textAlign={"center"}
            >
              -
            </Text>
          )}
        </Box>
        <Box display={"flex"} flexDirection={"column"} w={"50%"}>
          <Text
            color={ALL_COLOR.YELLOW}
            fontWeight={"700"}
            textAlign={"center"}
            mb={2}
          >
            다음
          </Text>
          {quest.next && quest.next.length > 0 ? (
            quest.next.map((item) => (
              <Text
                key={item.id}
                color={ALL_COLOR.WHITE}
                fontWeight={"700"}
                textAlign={"center"}
                cursor={"pointer"}
                _hover={{ color: ALL_COLOR.YELLOW }}
                mb={1}
              >
                <Link href={`/quest/detail/${item.id}`}>{item.name_kr}</Link>
              </Text>
            ))
          ) : (
            <Text
              color={ALL_COLOR.WHITE}
              fontWeight={"700"}
              textAlign={"center"}
            >
              -
            </Text>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
