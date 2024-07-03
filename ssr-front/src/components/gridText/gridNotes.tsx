import { GridItem, Text, Box } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import useColorValue from "@/hooks/useColorValue";
import Link from "next/link";
import type { GridNotes } from "@/types/types";

export default function GridNotes({ notes }: GridNotes) {
  const { blackWhite, beige } = useColorValue();
  return (
    <GridItem
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
    >
      {notes && notes.quest ? (
        <>
          <Text color={ALL_COLOR.LIGHT_YELLO} fontWeight={600}>
            퀘스트
          </Text>
          {notes.quest &&
            notes.quest.map((quest) => (
              <Link href={`/quest/detail/${quest.id}`}>
                <Text
                  color={blackWhite}
                  fontWeight={600}
                  _hover={{ color: beige }}
                >
                  -&nbsp;{quest.name_kr}
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
