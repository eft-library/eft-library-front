import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { ArrowRightIcon } from "@chakra-ui/icons";
import type { ProfileBotton } from "@/types/types";
import Link from "next/link";
import { timeAgo } from "@/lib/formatISODate";
import { MdOutlineThumbDown, MdOutlineThumbUp } from "react-icons/md";
import { getFirstParagraph } from "@/lib/quillFunc";

export default function ProfileBottomComment({ user_comments }: ProfileBotton) {
  return (
    <Box w="45%" display="flex" alignItems="center" flexDirection="column">
      <Box
        w="100%"
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Text fontWeight={800} p={2}>
          내 댓글 개발중
        </Text>
        <ArrowRightIcon cursor={"pointer"} />
      </Box>
      <Box
        w="100%"
        border="1px solid"
        borderRadius="lg"
        borderColor={ALL_COLOR.WHITE}
        p={4}
        h="40vh"
      >
        {user_comments.map((comment) => (
          <Box w={"100%"} key={comment.id}>
            <Link
              href={`/board/${comment.board_type}/detail/${comment.board_id}`}
            >
              <Flex
                width="100%"
                borderBottom="1px solid"
                borderColor={ALL_COLOR.DARK_GRAY}
                display={"flex"}
                pb={5}
                pt={5}
                alignItems="center"
                _hover={{ bg: ALL_COLOR.LIGHT_GRAY }}
              >
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  w={"100%"}
                >
                  <Heading
                    size="md"
                    mb={2}
                    dangerouslySetInnerHTML={{
                      __html: getFirstParagraph(comment.contents),
                    }}
                    isTruncated
                  />
                  <Text
                    fontSize="sm"
                    display="flex"
                    alignItems="center"
                    fontWeight={600}
                  >
                    <Box as="span" mx={2}>
                      {timeAgo(comment.create_time)}
                    </Box>
                    |
                    <Box as="span" display="flex" alignItems="center" mx={2}>
                      <MdOutlineThumbUp />
                      &nbsp;
                      {comment.like_count}
                    </Box>
                    |
                    <Box as="span" display="flex" alignItems="center" mx={2}>
                      <MdOutlineThumbDown />
                      &nbsp;
                      {comment.dislike_count}
                    </Box>
                  </Text>
                </Box>
              </Flex>
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
