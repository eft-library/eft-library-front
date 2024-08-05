"use client";

import type { BoardPost } from "@/types/types";
import { Box, Flex, Heading, Text, Image } from "@chakra-ui/react";
import { timeAgo } from "@/lib/formatISODate";
import { FaEye } from "react-icons/fa6";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { formatImage } from "@/lib/formatImage";

export default function DetailTitle({ post }: BoardPost) {
  return (
    <Box mb={5}>
      <Heading as="h2" size="lg" mb={3}>
        {post.title}
      </Heading>
      <Flex fontSize="0.9em" color={ALL_COLOR.WHITE}>
        <Text>{post.type_kr}</Text>
        <Text mx={2}>|</Text>
        <Text>{timeAgo(post.create_time)}</Text>
        <Text mx={2}>|</Text>
        <Flex align="center">
          <Image
            w={"24px"}
            src={formatImage(post.icon)}
            fallbackSrc="/loading.gif"
            alt={post.icon}
            ml={2}
          />
          &nbsp;<Text>{post.nick_name}</Text>
        </Flex>
        <Text mx={2}>|</Text>
        <Flex align="center">
          <FaEye />
          &nbsp;<Text>{post.view_count}</Text>
        </Flex>
      </Flex>
    </Box>
  );
}
