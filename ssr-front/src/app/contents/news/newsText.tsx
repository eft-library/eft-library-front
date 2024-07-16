import { Box, Text } from "@chakra-ui/react";
import Link from "next/link";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import type { NewsText } from "@/types/types";

export default function NewsText({ news }: NewsText) {
  return (
    <>
      <Box
        className="box box1"
        w="27.5%"
        p="20px"
        overflow="hidden"
        position="relative"
      >
        <Box
          className="box-content"
          textAlign="left"
          position="relative"
          fontSize="18px"
          w="100%"
          mb="40px"
        >
          <Text
            as="span"
            position="relative"
            display="block"
            mb="10px"
            fontWeight={600}
            _before={{
              content: '""',
              display: "block",
              width: "50%",
              height: "2px",
              backgroundColor: "white",
              position: "absolute",
              top: "-10px",
              left: "0",
            }}
          >
            다음 업데이트 예정
          </Text>
          <Box>
            {news.next_update.map((patch) => (
              <Text fontWeight={600} key={patch}>
                - {patch}
              </Text>
            ))}
          </Box>
        </Box>
        <Box
          className="box-content"
          textAlign="left"
          position="relative"
          fontSize="18px"
          w="100%"
          mb="20px"
        >
          <Text
            _before={{
              content: '""',
              display: "block",
              width: "50%",
              height: "2px",
              backgroundColor: "white",
              position: "absolute",
              top: "-10px",
              left: "0",
            }}
            fontWeight={600}
            cursor={"pointer"}
            className="event-plus"
            color={ALL_COLOR.MAIN_YELLO}
            _hover={{ color: ALL_COLOR.LIGHT_RED }}
          >
            <Link href={news.event_link}>이벤트+</Link>
          </Text>
          <Text
            fontWeight={600}
            className="patch-notes-plus"
            color={ALL_COLOR.MAIN_YELLO}
            cursor={"pointer"}
            _hover={{ color: ALL_COLOR.LIGHT_RED }}
          >
            <Link href={news.patch_link}>패치노트+</Link>
          </Text>
        </Box>
      </Box>
      <Box
        className="box box2"
        w="27.5%"
        p="20px"
        overflow="hidden"
        position="relative"
      >
        <Box
          className="box-content"
          textAlign="left"
          position="relative"
          fontSize="18px"
          w="100%"
          mb="20px"
        >
          <Text
            as="span"
            position="relative"
            display="block"
            fontWeight={600}
            _before={{
              content: '""',
              display: "block",
              width: "50%",
              height: "2px",
              backgroundColor: "white",
              position: "absolute",
              top: "-10px",
              left: "0",
            }}
          >
            현재 게임 버전
          </Text>
          <Text fontWeight={600}>- {news.game_version}</Text>
          <br />
          <Text fontWeight={600}>아레나 버전</Text>
          <Text fontWeight={600}>- {news.arena_version}</Text>
        </Box>
      </Box>
    </>
  );
}
