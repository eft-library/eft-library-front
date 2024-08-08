import { ALL_COLOR } from "@/util/consts/colorConsts";
import { Box, Text, VStack, HStack } from "@chakra-ui/react";
import DetailSubComment from "./detilSubComment";
import { MdOutlineThumbDown, MdOutlineThumbUp } from "react-icons/md";
import { MdOutlineReport } from "react-icons/md";

export default function DetailComment() {
  return (
    <Box
      borderTop="1px"
      borderColor={ALL_COLOR.GRAY}
      py={2}
      position="relative"
      mt={10}
    >
      <VStack align="start" spacing={2}>
        <HStack>
          <Text>아이콘</Text>
          <Text color="white" fontWeight={600}>
            {"nickname"}
          </Text>
          <Text color={ALL_COLOR.GRAY} fontSize="sm" fontWeight={600}>
            8분전
          </Text>
        </HStack>
        <Text fontWeight={600}>내용</Text>
      </VStack>
      <HStack position="absolute" top={4} right={2} spacing={1}>
        <Box
          display="flex"
          alignItems="center"
          bg={"none"}
          w={"60px"}
          cursor={"pointer"}
        >
          <Text
            fontWeight={600}
            _hover={{ color: ALL_COLOR.DARK_GRAY }}
            display={"flex"}
            alignItems={"center"}
          >
            <MdOutlineThumbUp /> &nbsp;&nbsp;123
          </Text>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          bg={"none"}
          w={"60px"}
          cursor={"pointer"}
        >
          <Text
            fontWeight={600}
            _hover={{ color: ALL_COLOR.DARK_GRAY }}
            display={"flex"}
            alignItems={"center"}
          >
            <MdOutlineThumbDown /> &nbsp;&nbsp;124
          </Text>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          bg={"none"}
          w={"60px"}
          cursor={"pointer"}
        >
          <Text
            fontWeight={600}
            _hover={{ color: ALL_COLOR.DARK_GRAY }}
            display={"flex"}
            alignItems={"center"}
          >
            <MdOutlineReport /> &nbsp;&nbsp;신고
          </Text>
        </Box>
      </HStack>
      <HStack justify="flex-end" spacing={1} mt={2}>
        <Box
          display="flex"
          alignItems="center"
          bg={"none"}
          w={"40px"}
          cursor={"pointer"}
        >
          <Text
            fontWeight={600}
            _hover={{ color: ALL_COLOR.DARK_GRAY }}
            display={"flex"}
            alignItems={"center"}
          >
            삭제
          </Text>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          bg={"none"}
          w={"40px"}
          cursor={"pointer"}
        >
          <Text
            fontWeight={600}
            _hover={{ color: ALL_COLOR.DARK_GRAY }}
            display={"flex"}
            alignItems={"center"}
          >
            답글
          </Text>
        </Box>
      </HStack>
      <VStack
        align="start"
        pl={5}
        borderLeft="2px"
        borderColor={ALL_COLOR.GRAY}
        mt={4}
      >
        <DetailSubComment />
      </VStack>
    </Box>
  );
}
