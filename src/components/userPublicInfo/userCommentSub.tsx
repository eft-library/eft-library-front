import { ALL_COLOR } from "@/util/consts/colorConsts";
import { Box, VStack, HStack, Text } from "@chakra-ui/react";
import CommentHeader from "../boardDetail/comment/commentHeader";
import ImgWithZoom from "../boardDetail/imgWithZoom";
import type { UserMainSubComment } from "@/types/types";
import { getFirstParagraph } from "@/lib/quillFunc";
import { IoArrowRedo } from "react-icons/io5";
import Link from "next/link";

export default function UserCommentSub({ comment }: UserMainSubComment) {
  return (
    <Box w={"100%"}>
      <Link
        href={{
          pathname: `/board/${comment.board_type}/detail/${comment.board_id}`,
          query: { commentId: comment.id },
        }}
      >
        <VStack
          align="start"
          mt={4}
          id={comment.id}
          w={"100%"}
          borderBottom="1px"
          borderColor={ALL_COLOR.GRAY}
          cursor={"pointer"}
          _hover={{ bg: ALL_COLOR.LIGHT_GRAY }}
        >
          <Text fontWeight={800} fontSize={24} mb={2}>
            {comment.title}
          </Text>
          <Box py={2} position="relative" w={"100%"}>
            <VStack align="start" spacing={2}>
              <HStack>
                <IoArrowRedo />
                <CommentHeader
                  icon={comment.icon}
                  nickName={comment.nick_name}
                  createTime={comment.create_time}
                  email={comment.user_email}
                />
              </HStack>
              <Box ml={6} w={"100%"}>
                <Text
                  as="span"
                  color={ALL_COLOR.QUEST_RELATED_ONE}
                  fontWeight={600}
                >
                  @{comment.parent_nick_name}
                </Text>
                <VStack align="start" spacing={2}>
                  <ImgWithZoom content={getFirstParagraph(comment.contents)} />
                </VStack>
              </Box>
            </VStack>
          </Box>
        </VStack>
      </Link>
    </Box>
  );
}
