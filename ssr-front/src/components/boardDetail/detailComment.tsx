import { ALL_COLOR } from "@/util/consts/colorConsts";
import { Box, Heading, Flex, Text, Textarea, Button } from "@chakra-ui/react";

export default function DetailComment() {
  return (
    <Box mt={5}>
      <Heading as="h3" size="md" mb={3}>
        댓글
      </Heading>
      <Box borderTop="1px solid gray" py={3}>
        <Flex justify="space-between" align="flex-start">
          <Box>
            <Text color="white">{"고인물"}</Text>
            <Text color="rgba(255, 255, 255, 0.5)" fontSize="0.9em">
              10분 전
            </Text>
            <Text mt={2}>여기에 댓글 내용이 들어갑니다.</Text>
          </Box>
          <Text color="white" cursor="pointer" ml={3}>
            답글
          </Text>
        </Flex>
      </Box>
      <Box mt={5} py={3}>
        <Textarea
          placeholder="댓글을 입력하세요..."
          bg={ALL_COLOR.LIGHT_GRAY}
          color="white"
          borderRadius="5px"
          resize="none"
        />
        <Button
          mt={2}
          bg="none"
          color="white"
          border="1px solid white"
          borderRadius="6px"
          _hover={{ bg: "rgba(255, 255, 255, 0.1)" }}
        >
          등록
        </Button>
      </Box>
    </Box>
  );
}
