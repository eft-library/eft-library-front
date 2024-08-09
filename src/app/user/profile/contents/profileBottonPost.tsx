import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { ArrowRightIcon } from "@chakra-ui/icons";
import type { ProfileBotton } from "@/types/types";
import Link from "next/link";
import { timeAgo } from "@/lib/formatISODate";
import { MdOutlineThumbUp } from "react-icons/md";
import { FaEye } from "react-icons/fa6";

export default function ProfileBottomPost({ user_posts }: ProfileBotton) {
  return (
    <Box w="45%" display="flex" alignItems="center" flexDirection="column">
      <Box
        w="100%"
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Text fontWeight={800} p={2}>
          내 게시글
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
        {user_posts.map((post) => (
          <Box w={"100%"} key={post.id}>
            <Link href={`/board/${post.type}/detail/${post.id}`}>
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
                  <Heading size="md" mb={2}>
                    {post.title}
                  </Heading>
                  <Text
                    fontSize="sm"
                    display="flex"
                    alignItems="center"
                    fontWeight={600}
                  >
                    <Box as="span" mr={2}>
                      {post.type_kr}
                    </Box>
                    |
                    <Box as="span" mx={2}>
                      {timeAgo(post.create_time)}
                    </Box>
                    |
                    <Box as="span" display="flex" alignItems="center" mx={2}>
                      <MdOutlineThumbUp />
                      &nbsp;
                      {post.like_count}
                    </Box>
                    |
                    <Box as="span" display="flex" alignItems="center" mx={2}>
                      <FaEye />
                      &nbsp;
                      {post.view_count}
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
