import { ALL_COLOR } from "@/util/consts/colorConsts";
import { Box, Input, Select, Text } from "@chakra-ui/react";
import type { EditorSub } from "@/types/types";

export default function SubContents({ subContents, setSubData }: EditorSub) {
  return (
    <Box w={"100%"} display={"flex"} flexDirection={"column"} mb={6}>
      <Box w={"100%"} display={"flex"} alignItems={"center"} mb={4}>
        <Box flex={"1"}>
          <Input
            placeholder="게시글 제목"
            bg={ALL_COLOR.BLACK}
            borderColor={ALL_COLOR.WHITE}
            value={subContents.title}
            onChange={(e) => setSubData(e, "title")}
          />
        </Box>
        <Box w={"40%"} ml={10}>
          <Select
            placeholder="게시글 분류"
            value={subContents.type}
            onChange={(e) => setSubData(e, "type")}
            bg={ALL_COLOR.BLACK}
            borderColor={ALL_COLOR.WHITE}
          >
            <option value={"forum"}>자유게시판</option>
            <option value={"tip"}>팁</option>
            <option value={"incident"}>사건/사고</option>
            <option value={"humor"}>유머</option>
          </Select>
        </Box>
      </Box>
      <Box borderRadius={"lg"} w={"100%"}>
        <Text bg={ALL_COLOR.LIGHT_GRAY} p={2}>
          경고문 1
        </Text>
        <Text bg={ALL_COLOR.LIGHT_GRAY} p={2}>
          경고문 2
        </Text>
        <Text bg={ALL_COLOR.LIGHT_GRAY} p={2}>
          경고문 3
        </Text>
      </Box>
    </Box>
  );
}
