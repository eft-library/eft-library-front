import { Box, SimpleGrid, Flex, Text, Image } from "@chakra-ui/react";
import type { ContentsSelector } from "@/types/types";
import ContentsSelectorSkeleton from "./contentsSelectorSkeleton";
import { ALL_COLOR } from "@/util/consts/colorConsts";

export default function ContentsSelector({
  onClickEvent,
  itemList,
  currentId,
  selectorId,
  itemDesc,
  isSpace = true,
  isEng = false,
  isAmmo = false,
  isImage = false,
}: ContentsSelector) {
  if (!itemList || itemList.length < 1) return <ContentsSelectorSkeleton />;

  const checkFontSize = (index: number) => {
    if (isAmmo) {
      return index === 0 ? 16 : 12;
    }
    // if (isEng) {
    //   return 16;
    // }
    return 16;
  };

  const checkBoxWidth = () => {
    if (isImage) {
      return "50px";
    }
    if (isEng) {
      return "140px";
    }
    return "110px";
  };

  const checkBoxHeight = () => {
    if (isImage) {
      return "50px";
    }
    return "40px";
  };

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
              w={checkBoxWidth()}
              h={checkBoxHeight()}
              color={ALL_COLOR.WHITE}
              outline={"1px solid"}
              outlineColor={item.color ? item.color : ALL_COLOR.WHITE}
              borderRadius={"lg"}
              _hover={{ bg: ALL_COLOR.LIGHT_GRAY }}
              bg={currentId === item[selectorId] ? ALL_COLOR.LIGHT_GRAY : ""}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              p={2}
            >
              {isImage ? (
                <Image src={item["image"]} />
              ) : (
                <Text
                  color={ALL_COLOR.WHITE}
                  fontSize={checkFontSize(index)}
                  fontWeight={700}
                  textAlign="center"
                >
                  {item[itemDesc]}
                </Text>
              )}
            </Box>
          </Flex>
        ))}
      </SimpleGrid>
    </Box>
  );
}
