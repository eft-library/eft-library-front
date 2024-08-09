import { ALL_COLOR } from "@/util/consts/colorConsts";
import { Box, VStack, HStack, useDisclosure, Text } from "@chakra-ui/react";
import type { DetailComment } from "@/types/types";
import { useState } from "react";
import CommentQuill from "./commentQuill";
import ImgWithZoom from "../imgWithZoom";
import "@/assets/commentEditor.css";
import { useAppStore } from "@/store/provider";
import { useSession } from "next-auth/react";
import CommentDelete from "./commentDelete";
import CommentAction from "./commentAction";
import CommentHeader from "./commentHeader";

export default function DetailMainComment({
  comment,
  submitComment,
  onClickDelete,
}: DetailComment) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAppStore((state) => state);
  const { data: session } = useSession();
  const [writeComment, setWriteComment] = useState(false);

  const checkDelete = () => {
    if (!session || !user) return false;
    if (comment.is_delete_by_admin || comment.is_delete_by_user) return false;
    if (user.user.email === comment.user_email) {
      return true;
    }
  };

  return (
    <Box
      borderTop="1px"
      borderColor={ALL_COLOR.GRAY}
      py={2}
      position="relative"
      mt={10}
    >
      <VStack align="start" spacing={2}>
        <CommentHeader
          icon={comment.icon}
          nickName={comment.nick_name}
          createTime={comment.create_time}
        />
        <ImgWithZoom content={comment.contents} />
      </VStack>
      <HStack position="absolute" top={4} right={2} spacing={1}>
        <CommentAction
          comment={comment}
          onLike={() => alert("좋아요")}
          onDislike={() => alert("싫어요")}
          onReport={() => alert("신고")}
        />
      </HStack>
      {checkDelete() && (
        <HStack justify="flex-end" spacing={1} mt={2}>
          <Box
            display="flex"
            alignItems="center"
            bg={"none"}
            w={"40px"}
            cursor={"pointer"}
          >
            <Text
              fontWeight={600}
              _hover={{ color: ALL_COLOR.DARK_GRAY }}
              display={"flex"}
              alignItems={"center"}
              onClick={onOpen}
            >
              삭제
            </Text>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            bg={"none"}
            w={"40px"}
            cursor={"pointer"}
            onClick={() => setWriteComment(!writeComment)}
          >
            <Text
              fontWeight={600}
              _hover={{ color: ALL_COLOR.DARK_GRAY }}
              display={"flex"}
              alignItems={"center"}
            >
              답글
            </Text>
          </Box>
        </HStack>
      )}
      {writeComment && (
        <CommentQuill
          submitComment={submitComment}
          setWriteComment={setWriteComment}
          comment={comment}
          depth={2}
        />
      )}
      <CommentDelete
        onClose={onClose}
        isOpen={isOpen}
        comment={comment}
        commentDelete={onClickDelete}
      />
    </Box>
  );
}
