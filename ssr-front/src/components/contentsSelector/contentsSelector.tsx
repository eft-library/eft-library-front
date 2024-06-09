import { Box, SimpleGrid, Flex, Text } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import type { ContentsSelector } from "@/types/types";
import ContentsSelectorSkeleton from "./contentsSelectorSkeleton";

export default function ContentsSelector({
  onClickEvent,
  itemList,
  currentId,
  selectorId,
  itemDesc,
}: ContentsSelector) {
  if (!itemList || itemList.length < 1) return <ContentsSelectorSkeleton />;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems={"center"}
      mb={14}
      mt={10}
    >
      <SimpleGrid columns={[2, null, 7]} spacing={4}>
        {itemList.map((item, index) => (
          <Flex
            flexDirection={"column"}
            key={index}
            onClick={() => onClickEvent(item[selectorId])}
          >
            <Box
              cursor={"pointer"}
              w="110px"
              h="40px"
              color={ALL_COLOR.WHITE}
              outline={"1px solid"}
              outlineColor={ALL_COLOR.WHITE}
              borderRadius={"lg"}
              _hover={{ bg: ALL_COLOR.LIGHT_GRAY }}
              bg={currentId === item[selectorId] ? ALL_COLOR.LIGHT_GRAY : ""}
            >
              <Text
                color={ALL_COLOR.WHITE}
                mt={2}
                fontWeight={700}
                textAlign="center"
              >
                {item[itemDesc]}
              </Text>
            </Box>
          </Flex>
        ))}
      </SimpleGrid>
    </Box>
  );
}
