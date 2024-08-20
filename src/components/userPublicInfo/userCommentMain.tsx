import { ALL_COLOR } from "@/util/consts/colorConsts";
import { Box, VStack, HStack, Text } from "@chakra-ui/react";
import CommentHeader from "../boardDetail/comment/commentHeader";
import ImgWithZoom from "../boardDetail/imgWithZoom";
import type { UserMainSubComment } from "@/types/types";
import { getFirstParagraph } from "@/lib/quillFunc";
import Link from "next/link";

export default function UserCommentMain({ comment }: UserMainSubComment) {
  return (
    <Box w={"95%"}>
      <Link href={`/board/${comment.board_type}/detail/${comment.board_id}`}>
        <Box
          borderBottom="1px"
          borderColor={ALL_COLOR.GRAY}
          py={2}
          position="relative"
          id={comment.id}
          w={"100%"}
          mb={2}
          cursor={"pointer"}
          _hover={{ bg: ALL_COLOR.LIGHT_GRAY }}
        >
          <Text fontWeight={800} fontSize={24} mb={2}>
            {comment.title}
          </Text>
          <VStack align="start" spacing={2}>
            <HStack>
              <CommentHeader
                icon={comment.icon}
                nickName={comment.nick_name}
                createTime={comment.create_time}
                email={comment.user_email}
              />
            </HStack>
            <Box w={"100%"}>
              <VStack align="start" spacing={2}>
                <ImgWithZoom content={getFirstParagraph(comment.contents)} />
              </VStack>
            </Box>
          </VStack>
        </Box>
      </Link>
    </Box>
  );
}
