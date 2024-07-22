import { GridItem, Text, Box } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import Link from "next/link";
import type { GridNotes, JsonArrayText } from "@/types/types";
import { useAppStore } from "@/store/provider";

export default function GridNotes({
  questsNotes,
  hideoutNotes = [],
  isKey = false,
}: GridNotes) {
  const { setHideoutCategory } = useAppStore((state) => state);

  const getQuestTitle = (title: string, quest_id: string) => {
    // 첫 번째 부분 추출
    let firstPart = title.substring(0, title.indexOf("(")).trim();

    return (
      <Link href={`/quest/detail/${quest_id}`} key={quest_id}>
        <Text
          fontWeight={600}
          color={ALL_COLOR.YELLOW}
          _hover={{ color: ALL_COLOR.QUEST_YELLO }}
        >
          {firstPart}
        </Text>
      </Link>
    );
  };

  const returnQuestText = (note: JsonArrayText) => {
    if (isKey) {
      return <Box display={"flex"}>{getQuestTitle(note.name_kr, note.id)}</Box>;
    } else {
      return note.in_raid ? (
        <Box display={"flex"}>
          {getQuestTitle(note.name_kr, note.id)}
          <Text fontWeight={600}>&nbsp;(</Text>
          <Text fontWeight={600} color={ALL_COLOR.LIGHT_RED}>
            인레이드&nbsp;
          </Text>
          <Text fontWeight={600}>{note.count}개 필요)</Text>
        </Box>
      ) : (
        <Box display={"flex"}>
          {getQuestTitle(note.name_kr, note.id)}
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
      p={2}
    >
      {questsNotes.length > 0 && (
        <>
          <Text color={ALL_COLOR.WHITE} fontWeight={600}>
            퀘스트
          </Text>
          {questsNotes.map((quest) => (
            <Box key={quest.id}>{returnQuestText(quest)}</Box>
          ))}
        </>
      )}
      {hideoutNotes.length > 0 && (
        <>
          <Text
            color={ALL_COLOR.WHITE}
            fontWeight={600}
            mt={questsNotes.length > 0 ? 4 : 0}
          >
            은신처
          </Text>
          {hideoutNotes.map((hideout, index) => (
            <Box key={index} display={"flex"}>
              <Link
                href={`/hideout?id=${hideout.level_id}`}
                scroll={false}
                onClick={() => setHideoutCategory(hideout.master_id)}
              >
                <Text
                  fontWeight={600}
                  color={ALL_COLOR.YELLOW}
                  _hover={{ color: ALL_COLOR.QUEST_YELLO }}
                >
                  {hideout.name_kr}
                </Text>
              </Link>
              <Text fontWeight={600} color={ALL_COLOR.WHITE}>
                &nbsp;({hideout.count}개 필요)
              </Text>
            </Box>
          ))}
        </>
      )}
      {questsNotes.length === 0 && hideoutNotes.length === 0 && (
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
