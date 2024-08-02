import { ALL_COLOR } from "@/util/consts/colorConsts";
import {
  Box,
  Flex,
  Text,
  Heading,
  Container,
  Button,
  Textarea,
} from "@chakra-ui/react";
import BoardHeader from "@/components/board/boardHeader";

export default function ForumDetail() {
  return (
    <Box
      w={"100%"}
      bg={ALL_COLOR.BLACK}
      pb={20}
      paddingTop="80px"
      paddingBottom="20px"
    >
      <Container
        maxW="1300px"
        p={0}
        bg={ALL_COLOR.BACKGROUND}
        color="white"
        fontWeight="bold"
      >
        <Box textAlign="center" my={5}>
          <Heading as="h1" size="2xl" fontWeight="bold">
            타르코프 커뮤니티
          </Heading>
        </Box>

        <BoardHeader siteParam="forum" />

        <Box border="1px solid white" p={5} borderRadius="10px">
          <Box mb={5}>
            <Heading as="h2" size="lg" mb={3}>
              게시글 제목
            </Heading>
            <Flex fontSize="0.9em" color="rgba(255, 255, 255, 0.5)">
              <Text>PVP</Text>
              <Text mx={2}>|</Text>
              <Text>8분 전</Text>
              <Text mx={2}>|</Text>
              <Text>닉네임</Text>
              <Text mx={2}>|</Text>
              <Flex align="center">456</Flex>
            </Flex>
          </Box>

          <Box position="relative" pb={10}>
            <Text>
              오늘 삼림 갔는데 머시머시머시머시머시 빅파이프 나이트 땃음
            </Text>
            <Flex position="absolute" bottom={2} right={2} align="center">
              <Flex align="center" mx={2}>
                123
              </Flex>
              <Flex align="center" mx={2}>
                45
              </Flex>
            </Flex>
          </Box>

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
                bg="#444"
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
        </Box>
      </Container>
    </Box>
  );
}
