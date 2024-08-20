"use client";

import { ALL_COLOR } from "@/util/consts/colorConsts";
import { Box, VStack, HStack, useDisclosure, Text } from "@chakra-ui/react";
import { IoArrowRedo } from "react-icons/io5";
import "@/assets/editor.css";
import "react-quill/dist/quill.snow.css";
import ImgWithZoom from "../imgWithZoom";
import { useAppStore } from "@/store/provider";
import { useSession } from "next-auth/react";
import CommentDelete from "./commentDelete";
import CommentAction from "./commentAction";
import CommentHeader from "./commentHeader";
import CommentReport from "./commentReport";
import type { DetailIssue } from "@/types/types";

export default function DetailIssueComment({
  comment,
  getComment,
  onClickDelete,
  onClickLikeOrDis,
}: DetailIssue) {
  const {
    isOpen: isReportOpen,
    onOpen: onReportOpen,
    onClose: onReportClose,
  } = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAppStore((state) => state);
  const { data: session } = useSession();

  const checkDelete = () => {
    if (!session || !user) return false;
    if (comment.is_delete_by_admin || comment.is_delete_by_user) return false;
    if (user.user.email === comment.user_email) {
      return true;
    }
  };

  return (
    <VStack
      align="start"
      pl={5}
      borderLeft="2px"
      borderColor={ALL_COLOR.YELLOW}
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
              <ImgWithZoom content={comment.contents} />
            </VStack>
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
              onClick={() => getComment(comment.id)}
            >
              이동
            </Text>
          </Box>
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
        </HStack>
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
