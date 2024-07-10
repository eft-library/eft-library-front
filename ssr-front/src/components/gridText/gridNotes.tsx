import { GridItem, Text, Box } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import Link from "next/link";
import type { GridNotes, JsonArrayText } from "@/types/types";

export default function GridNotes({ notes, isKey = false }: GridNotes) {
  const returnText = (note: JsonArrayText) => {
    if (isKey) {
      return note.name_kr;
    } else {
      return note.in_raid ? (
        <Box display={"flex"} _hover={{ color: ALL_COLOR.BEIGE }}>
          <Text>{note.name_kr}&nbsp;</Text>
          <Text>(</Text>
          <Text color={ALL_COLOR.LIGHT_RED}>인레이드&nbsp;</Text>
          <Text>{note.count}개 필요)</Text>
        </Box>
      ) : (
        <Box _hover={{ color: ALL_COLOR.BEIGE }} display={"flex"}>
          <Text>{note.name_kr}</Text>
          <Text>&nbsp;({note.count}개 필요)</Text>
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
              <Text color={ALL_COLOR.WHITE} fontWeight={600}>
                {returnText(quest)}
              </Text>
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
