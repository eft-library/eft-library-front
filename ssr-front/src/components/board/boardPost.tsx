import { Box, Flex, Heading, Text, Image } from "@chakra-ui/react";
import type { BoardPost } from "@/types/types";
import { timeAgo } from "@/lib/formatISODate";
import { formatImage } from "@/lib/formatImage";
import Link from "next/link";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { MdOutlineThumbUp } from "react-icons/md";
import { FaEye } from "react-icons/fa6";

export default function BoardPost({ post }: BoardPost) {
  return (
    <Box w={"100%"}>
      <Link href={`/board/${post.type}/detail/${post.id}`}>
        <Flex
          width="100%"
          borderBottom="1px solid gray"
          display={"flex"}
          pb={5}
          pt={5}
          alignItems="center"
          _hover={{ bg: ALL_COLOR.LIGHT_GRAY }}
        >
          <Box flex="1">
            <Heading size="md" mb={2}>
              {post.title}
            </Heading>
            <Text fontSize="sm" display="flex" alignItems="center">
              <Box as="span" mr={2}>
                {post.type}
              </Box>
              |
              <Box as="span" mx={2}>
                {timeAgo(post.create_time)}
              </Box>
              |
              <Image
                w={"34px"}
                src={formatImage(post.image)}
                fallbackSrc="/loading.gif"
                alt={post.image}
                ml={2}
              />
              <Box as="span" mx={2}>
                {post.nick_name}
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
          {post.thumbnail && (
            <Image
              w={"200px"}
              h={"100px"}
              src={post.thumbnail}
              fallbackSrc="/loading.gif"
              alt={post.thumbnail}
            />
          )}
        </Flex>
      </Link>
    </Box>
  );
}
