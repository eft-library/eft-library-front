import { ALL_COLOR } from "@/util/consts/colorConsts";
import { Box, HStack, VStack, Text } from "@chakra-ui/react";
import { IoArrowRedo } from "react-icons/io5";

export default function DetailSubComment() {
  return (
    <Box py={2} position="relative" w={"100%"}>
      <VStack align="start" spacing={2}>
        <HStack>
          <IoArrowRedo />
          <Text>아이콘</Text>
          <Text color="white" fontWeight={600}>
            닉네임
          </Text>
          <Text color="gray.500" fontSize="sm" fontWeight={600}>
            8분전
          </Text>
        </HStack>
        <Text ml={6}>
          <Text as="span" color={ALL_COLOR.YELLOW} fontWeight={600}>
            @답글 닉네임
          </Text>
          &nbsp;&nbsp;내용
        </Text>
      </VStack>
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
    </Box>
  );
}
