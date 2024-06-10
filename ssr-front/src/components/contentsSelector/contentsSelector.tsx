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
              color={blackWhite}
              outline={"1px solid"}
              outlineColor={blackWhite}
              borderRadius={"lg"}
              _hover={{ bg: darkLightgray }}
              bg={currentId === item[selectorId] ? darkLightgray : ""}
            >
              <Text
                color={blackWhite}
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
