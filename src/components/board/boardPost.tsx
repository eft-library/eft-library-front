import { Box, Flex, Heading, Text, Image } from "@chakra-ui/react";
import type { BoardPost } from "@/types/types";
import { timeAgo } from "@/lib/formatISODate";
import { formatImage } from "@/lib/formatImage";
import Link from "next/link";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { MdOutlineThumbUp } from "react-icons/md";
import { FaEye } from "react-icons/fa6";
import { PiStarFill } from "react-icons/pi";

export default function BoardPost({ post }: BoardPost) {
  return (
    <Box w={"100%"}>
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
          <Box flex="1">
            <Heading size="md" mb={2} display="flex" alignItems="center">
              {post.like_count > 10 && post.like_count < 30 && (
                <PiStarFill color={ALL_COLOR.WHITE} />
              )}
              {post.like_count > 30 && <PiStarFill color={ALL_COLOR.YELLOW} />}
              &nbsp;
              {post.title}&nbsp;
              <Text color={ALL_COLOR.YELLOW}>({post.comment_cnt})</Text>
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
              <Image
                w={"34px"}
                src={
                  post.icon
                    ? formatImage(post.icon)
                    : formatImage("/tkl_user/icon/newbie.gif")
                }
                fallbackSrc="/loading.gif"
                alt={post.icon}
                ml={2}
              />
              <Box as="span" mx={2}>
                {post.nick_name || "탈퇴한 사용자"}
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
