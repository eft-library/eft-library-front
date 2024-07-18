import { GridItem, Text, Box } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import Link from "next/link";
import type { GridNotes, JsonArrayText } from "@/types/types";

export default function GridNotes({ notes, isKey = false }: GridNotes) {
  const getTitle = (title: string) => {
    // 첫 번째 부분 추출
    let firstPart = title.substring(0, title.indexOf("(")).trim();

    return <Text fontWeight={600}>{firstPart}</Text>;
  };

  const returnText = (note: JsonArrayText) => {
    if (isKey) {
      return (
        <Box display={"flex"} _hover={{ color: ALL_COLOR.BEIGE }}>
          <Text fontWeight={600}>{getTitle(note.name_kr)}</Text>
        </Box>
      );
    } else {
      return note.in_raid ? (
        <Box display={"flex"} _hover={{ color: ALL_COLOR.BEIGE }}>
          {getTitle(note.name_kr)}
          <Text fontWeight={600}>&nbsp;(</Text>
          <Text fontWeight={600} color={ALL_COLOR.LIGHT_RED}>
            인레이드&nbsp;
          </Text>
          <Text fontWeight={600}>{note.count}개 필요)</Text>
        </Box>
      ) : (
        <Box _hover={{ color: ALL_COLOR.BEIGE }} display={"flex"}>
          <Text fontWeight={600}>{getTitle(note.name_kr)}</Text>
          <Text fontWeight={600}>&nbsp;({note.count}개 필요)</Text>
        </Box>
      );
    }
  };
  return (
    <GridItem
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      colSpan={2}
    >
      {notes.length ? (
        <>
          <Text color={ALL_COLOR.QUEST_YELLO} fontWeight={600}>
            퀘스트
          </Text>
          {notes.map((quest) => (
            <Link href={`/quest/detail/${quest.id}`} key={quest.id}>
              <Box>{returnText(quest)}</Box>
            </Link>
          ))}
        </>
      ) : (
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Text color={ALL_COLOR.WHITE} fontWeight={600}>
            -
          </Text>
        </Box>
      )}
    </GridItem>
  );
}
