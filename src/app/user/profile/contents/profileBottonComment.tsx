"use client";

import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { ArrowRightIcon } from "@chakra-ui/icons";
import type { ProfileBotton } from "@/types/types";
import Link from "next/link";
import { timeAgo } from "@/lib/formatISODate";
import { MdOutlineThumbDown, MdOutlineThumbUp } from "react-icons/md";
import { getFirstParagraph } from "@/lib/quillFunc";
import { useAppStore } from "@/store/provider";

export default function ProfileBottomComment({ user_comments }: ProfileBotton) {
  const { setSearchUser, user } = useAppStore((state) => state);
  const linkComment = () => {
    setSearchUser(user.user.email);
  };

  return (
    <Box w="45%" display="flex" alignItems="center" flexDirection="column">
      <Box
        w="100%"
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Text fontWeight={800} p={2}>
          내 댓글
        </Text>
        <Link href={"/user/comment?id=1"}>
          <ArrowRightIcon
            onClick={linkComment}
            cursor={"pointer"}
            _hover={{ color: ALL_COLOR.YELLOW }}
          />
        </Link>
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
              href={{
                pathname: `/board/${comment.board_type}/detail/${comment.board_id}`,
                query: { commentId: comment.id },
              }}
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
                    size="sm"
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
