"use client";

import { ALL_COLOR } from "@/util/consts/colorConsts";
import {
  Box,
  Text,
  VStack,
  HStack,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import { MdOutlineThumbDown, MdOutlineThumbUp } from "react-icons/md";
import { MdOutlineReport } from "react-icons/md";
import type { DetailComment } from "@/types/types";
import { timeAgo } from "@/lib/formatISODate";
import { formatImage } from "@/lib/formatImage";
import { useState } from "react";
import CommentQuill from "./commentQuill";
import ImgWithZoom from "../imgWithZoom";
import "@/assets/commentEditor.css";
import { useAppStore } from "@/store/provider";
import { useSession } from "next-auth/react";
import CommentDelete from "./commentDelete";

export default function DetailMainComment({
  comment,
  submitComment,
  onClickDelete,
}: DetailComment) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAppStore((state) => state);
  const { data: session } = useSession();
  const [writeComment, setWriteComment] = useState(false);

  return (
    <Box
      borderTop="1px"
      borderColor={ALL_COLOR.GRAY}
      py={2}
      position="relative"
      mt={10}
    >
      <VStack align="start" spacing={2}>
        <HStack>
          <Image
            w={"30px"}
            src={
              comment.icon
                ? formatImage(comment.icon)
                : formatImage("/tkl_user/icon/newbie.gif")
            }
            fallbackSrc="/loading.gif"
            alt={comment.icon}
            ml={2}
          />
          <Text color="white" fontWeight={600}>
            {comment.nick_name ? comment.nick_name : "탈퇴한 사용자"}
          </Text>
          <Text color={ALL_COLOR.GRAY} fontSize="sm" fontWeight={600}>
            {timeAgo(comment.create_time)}
          </Text>
        </HStack>
        <ImgWithZoom content={comment.contents} />
      </VStack>
      <HStack position="absolute" top={4} right={2} spacing={1}>
        <Box
          display="flex"
          alignItems="center"
          bg={"none"}
          w={"60px"}
          cursor={"pointer"}
        >
          <Text
            fontWeight={600}
            _hover={{ color: ALL_COLOR.DARK_GRAY }}
            display={"flex"}
            alignItems={"center"}
          >
            <MdOutlineThumbUp /> &nbsp;&nbsp;{comment.like_count}
          </Text>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          bg={"none"}
          w={"60px"}
          cursor={"pointer"}
        >
          <Text
            fontWeight={600}
            _hover={{ color: ALL_COLOR.DARK_GRAY }}
            display={"flex"}
            alignItems={"center"}
          >
            <MdOutlineThumbDown /> &nbsp;&nbsp;{comment.dislike_count}
          </Text>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          bg={"none"}
          w={"60px"}
          cursor={"pointer"}
        >
          <Text
            fontWeight={600}
            _hover={{ color: ALL_COLOR.DARK_GRAY }}
            display={"flex"}
            alignItems={"center"}
          >
            <MdOutlineReport /> &nbsp;&nbsp;신고
          </Text>
        </Box>
      </HStack>
      <HStack justify="flex-end" spacing={1} mt={2}>
        {session && user && user.user.email === comment.user_email && (
          <Box
            display="flex"
            alignItems="center"
            bg={"none"}
            w={"40px"}
            cursor={"pointer"}
            onClick={onOpen}
          >
            <Text
              fontWeight={600}
              _hover={{ color: ALL_COLOR.DARK_GRAY }}
              display={"flex"}
              alignItems={"center"}
            >
              삭제
            </Text>
          </Box>
        )}
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
      {writeComment && (
        // depth 1에 댓글 작성하는 것이라 무조건 2번째임
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
