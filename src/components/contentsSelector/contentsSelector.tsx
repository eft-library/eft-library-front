import { Box, SimpleGrid, Flex, Text, Image, Skeleton } from "@chakra-ui/react";
import type { ContentsSelector } from "@/types/types";
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
  skeletonCount = 10,
  columnKey = "json_value",
  isUseColumnKey = true,
}: ContentsSelector) {
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
    return "120px";
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
        {!itemList
          ? Array(skeletonCount)
              .fill(null)
              .map((_, index) => (
                <Flex
                  flexDirection={"column"}
                  key={index}
                  justifyContent="center"
                  alignItems="center"
                >
                  <Skeleton height={checkBoxHeight()} width={checkBoxWidth()} />
                </Flex>
              ))
          : isUseColumnKey
          ? itemList[columnKey].map((item, index) => (
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
                  bg={
                    currentId === item[selectorId] ? ALL_COLOR.LIGHT_GRAY : ""
                  }
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  p={2}
                >
                  {isImage ? (
                    <Image src={item["image"]} alt={item["desc_en"]} />
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
            ))
          : itemList.map((item, index) => (
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
                  bg={
                    currentId === item[selectorId] ? ALL_COLOR.LIGHT_GRAY : ""
                  }
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  p={2}
                >
                  {isImage ? (
                    <Image src={item["image"]} alt={item["desc_en"]} />
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
