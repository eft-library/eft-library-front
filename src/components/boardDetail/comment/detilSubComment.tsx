import { ALL_COLOR } from "@/util/consts/colorConsts";
import { Box, VStack, HStack, useDisclosure, Text } from "@chakra-ui/react";
import { IoArrowRedo } from "react-icons/io5";
import type { DetailComment } from "@/types/types";
import { useState } from "react";
import "@/assets/editor.css";
import "react-quill/dist/quill.snow.css";
import CommentQuill from "./commentQuill";
import ImgWithZoom from "../imgWithZoom";
import { useAppStore } from "@/store/provider";
import { useSession } from "next-auth/react";
import CommentDelete from "./commentDelete";
import CommentAction from "./commentAction";
import CommentHeader from "./commentHeader";
import CommentReport from "./commentReport";
import CommentRewrite from "./commentRewrite";

export default function DetailSubComment({
  comment,
  submitComment,
  onClickDelete,
  onClickLikeOrDis,
  getComment,
  currentComment,
}: DetailComment) {
  const {
    isOpen: isReportOpen,
    onOpen: onReportOpen,
    onClose: onReportClose,
  } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAppStore((state) => state);
  const { data: session } = useSession();
  const [writeComment, setWriteComment] = useState(false);
  const [isRewrite, setIsRewrite] = useState(false);

  const checkDelete = () => {
    if (!session || !user) return false;
    if (comment.is_delete_by_admin || comment.is_delete_by_user) return false;
    if (user.user.email === comment.user_email) {
      return true;
    }
  };

  const checkReply = () => {
    if (!session || !user) return false;
    if (comment.is_delete_by_admin || comment.is_delete_by_user) return false;
    return true;
  };

  return (
    <VStack
      align="start"
      pl={5}
      borderLeft="2px"
      borderColor={ALL_COLOR.GRAY}
      mt={4}
    >
      <Box py={2} position="relative" w={"100%"}>
        <VStack align="start" spacing={2}>
          <HStack>
            <IoArrowRedo />
            <CommentHeader
              icon={comment.icon}
              nickName={comment.nick_name}
              createTime={comment.create_time}
            />
          </HStack>
          <Box ml={6} w={"100%"}>
            <Text as="span" color={ALL_COLOR.YELLOW} fontWeight={600}>
              @{comment.parent_nick_name}
            </Text>
            {isRewrite ? (
              <VStack align="start" spacing={2}>
                <CommentRewrite
                  comment={comment}
                  getComment={getComment}
                  currentComment={currentComment}
                  setIsRewrite={setIsRewrite}
                  editorWidth="95%"
                />
              </VStack>
            ) : (
              <VStack align="start" spacing={2}>
                <ImgWithZoom content={comment.contents} />
              </VStack>
            )}
          </Box>
        </VStack>
        <HStack position="absolute" top={4} right={2} spacing={1}>
          <CommentAction
            comment={comment}
            onClickDelete={onClickDelete}
            onLike={onClickLikeOrDis}
            onOpen={onReportOpen}
          />
        </HStack>
        <HStack justify="flex-end" spacing={1} mt={2}>
          {checkDelete() && (
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
                onClick={() => setIsRewrite(true)}
                alignItems={"center"}
              >
                수정
              </Text>
            </Box>
          )}
          {checkDelete() && (
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
          )}
          {checkReply() && (
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
          )}
        </HStack>
        {writeComment &&
          (user.ban.ban_end_time ? (
            <Box w={"100%"} mt={10}>
              <Text textAlign={"center"}>
                밴 당한 사용자는 댓글 작성이 제한 됩니다.
              </Text>
            </Box>
          ) : (
            <CommentQuill
              submitComment={submitComment}
              setWriteComment={setWriteComment}
              comment={comment}
              depth={2}
            />
          ))}
        <CommentDelete
          onClose={onClose}
          isOpen={isOpen}
          comment={comment}
          commentDelete={onClickDelete}
          isUser={true}
        />
        <CommentReport
          comment={comment}
          isOpen={isReportOpen}
          onClose={onReportClose}
        />
      </Box>
    </VStack>
  );
}
