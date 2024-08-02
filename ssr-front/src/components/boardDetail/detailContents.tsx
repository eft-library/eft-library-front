import type { BoardPost } from "@/types/types";
import { Box, Text, Flex } from "@chakra-ui/react";
import { MdOutlineThumbUp, MdOutlineThumbDown } from "react-icons/md";
import "@/assets/editor.css";

export default function DetailContents({ post }: BoardPost) {
  return (
    <Box position="relative" pb={10}>
      <Text
        className="view-editor"
        dangerouslySetInnerHTML={{ __html: post.contents }}
      />
      <Flex position="absolute" bottom={2} right={2} align="center">
        <Flex align="center" mx={2}>
          <MdOutlineThumbUp />
          &nbsp;
          {post.like_count}
        </Flex>
        <Flex align="center" mx={2}>
          <MdOutlineThumbDown />
          &nbsp;
          {/* {post.dislike_count} */}
        </Flex>
      </Flex>
    </Box>
  );
}
