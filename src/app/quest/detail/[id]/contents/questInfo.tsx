import { Box, Text, Flex } from "@chakra-ui/react";
import { formatImage } from "@/lib/formatImage";
import type { QuestInfo } from "@/types/types";
import InfoSkeleton from "../../skeleton/infoSkeleton";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import React from "react";

export default function QuestInfo({ quest }: QuestInfo) {
  if (!quest) return <InfoSkeleton />;
  const router = useRouter();

  const onClickNPC = () => {
    router.push("/quest");
  };

  const getTitle = (title: string) => {
    // 첫 번째 부분 추출
    let firstPart = title.substring(0, title.indexOf("(")).trim();

    // 두 번째 부분 추출
    let secondPart = title.substring(title.indexOf("(")).trim();

    return (
      <>
        <Text
          color={ALL_COLOR.WHITE}
          textAlign={"center"}
          mt={"4"}
          fontWeight={"700"}
          fontSize="lg"
        >
          {firstPart}
        </Text>
        <Text
          color={ALL_COLOR.WHITE}
          textAlign={"center"}
          fontWeight={"700"}
          fontSize="lg"
        >
          {secondPart}
        </Text>
      </>
    );
  };

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
        _hover={{ outlineColor: ALL_COLOR.LIGHT_GRAY }}
        style={{ cursor: "pointer" }}
        onClick={onClickNPC}
      />
      {getTitle(quest.title_kr)}
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

          {!quest.requires || quest.requires.length <= 0 ? (
            <Text
              color={ALL_COLOR.WHITE}
              fontWeight={"700"}
              textAlign={"center"}
            >
              -
            </Text>
          ) : (
            quest.requires.map((item, index) => {
              const others = quest.requires.filter((i) => i.is_other);
              const isLastOther =
                item.is_other && others.indexOf(item) === others.length - 1;

              return (
                <React.Fragment key={item.id}>
                  {item.is_other === false ? (
                    <Text
                      color={ALL_COLOR.WHITE}
                      fontWeight={"700"}
                      textAlign={"center"}
                      cursor={"pointer"}
                      _hover={{ color: ALL_COLOR.YELLOW }}
                      mb={1}
                    >
                      <Link href={`/quest/detail/${item.id}`}>
                        {item.name_kr}
                      </Link>
                    </Text>
                  ) : (
                    <>
                      <Text
                        color={ALL_COLOR.WHITE}
                        fontWeight={"700"}
                        textAlign={"center"}
                        cursor={"pointer"}
                        _hover={{ color: ALL_COLOR.ORANGE }}
                      >
                        <Link href={`/quest/detail/${item.id}`}>
                          {item.name_kr}
                        </Link>
                      </Text>
                      {!isLastOther && (
                        <Text fontWeight={"700"} textAlign={"center"}>
                          or
                        </Text>
                      )}
                    </>
                  )}
                </React.Fragment>
              );
            })
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
          {!quest.next || quest.next.length <= 0 ? (
            <Text
              color={ALL_COLOR.WHITE}
              fontWeight={"700"}
              textAlign={"center"}
            >
              -
            </Text>
          ) : (
            quest.next.map((item, index) => {
              const isLastOther =
                item.is_other &&
                quest.next.filter((i) => i.is_other).length - 1 ===
                  quest.next.filter((i) => i.is_other).indexOf(item);

              return (
                <React.Fragment key={item.id}>
                  {item.is_other === false ? (
                    <Text
                      color={ALL_COLOR.WHITE}
                      fontWeight={"700"}
                      textAlign={"center"}
                      cursor={"pointer"}
                      _hover={{ color: ALL_COLOR.YELLOW }}
                      mb={1}
                    >
                      <Link href={`/quest/detail/${item.id}`}>
                        {item.name_kr}
                      </Link>
                    </Text>
                  ) : (
                    <>
                      <Text
                        color={ALL_COLOR.WHITE}
                        fontWeight={"700"}
                        textAlign={"center"}
                        cursor={"pointer"}
                        _hover={{ color: ALL_COLOR.ORANGE }}
                      >
                        <Link href={`/quest/detail/${item.id}`}>
                          {item.name_kr}
                        </Link>
                      </Text>
                      {!isLastOther && (
                        <Text fontWeight={"700"} textAlign={"center"}>
                          or
                        </Text>
                      )}
                    </>
                  )}
                </React.Fragment>
              );
            })
          )}
        </Box>
      </Flex>
    </Box>
  );
}
