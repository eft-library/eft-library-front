import { GridItem, Text, Box } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import useColorValue from "@/hooks/useColorValue";
import Link from "next/link";
import type { GridNotes, JsonArrayText } from "@/types/types";

export default function GridNotes({ notes, isKey = false }: GridNotes) {
  const { blackWhite, beige } = useColorValue();
  const returnText = (note: JsonArrayText) => {
    if (isKey) {
      return note.name_kr;
    } else {
      return note.in_raid ? (
        <Text display={"flex"}>
          {note.name_kr}&nbsp;(
          <Text color={ALL_COLOR.LIGHT_RED}>인레이드&nbsp;</Text>
          {note.count}개 필요)
        </Text>
      ) : (
        <Text>
          {note.name_kr} ({note.count}개 필요)
        </Text>
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
              <Text
                color={blackWhite}
                fontWeight={600}
                _hover={{ color: beige }}
              >
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
          <Text color={blackWhite} fontWeight={600}>
            -
          </Text>
        </Box>
      )}
    </GridItem>
  );
}
