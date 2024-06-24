import { Box, SimpleGrid, Flex, Text } from "@chakra-ui/react";
import type { ContentsSelector } from "@/types/types";
import ContentsSelectorSkeleton from "./contentsSelectorSkeleton";
import useColorValue from "@/hooks/useColorValue";

export default function ContentsSelector({
  onClickEvent,
  itemList,
  currentId,
  selectorId,
  itemDesc,
  isSpace = true,
  isEng = false,
}: ContentsSelector) {
  const { blackWhite, darkLightgray } = useColorValue();

  if (!itemList || itemList.length < 1) return <ContentsSelectorSkeleton />;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems={"center"}
      mb={14}
      mt={10}
      w={"100%"}
    >
      <SimpleGrid
        columns={[2, null, 7]}
        spacing={isSpace ? 4 : 2}
        display="flex"
        justifyContent="center"
        alignItems={"center"}
        flexWrap={"wrap"}
      >
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
              color={blackWhite}
              outline={"1px solid"}
              outlineColor={item.color ? item.color : blackWhite}
              borderRadius={"lg"}
              _hover={{ bg: darkLightgray }}
              bg={currentId === item[selectorId] ? darkLightgray : ""}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              p={2}
            >
              <Text
                color={blackWhite}
                fontSize={isEng ? (index === 0 ? 16 : 12) : 16}
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
