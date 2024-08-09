import { formatImage } from "@/lib/formatImage";
import { timeAgo } from "@/lib/formatISODate";
import { DetailComment } from "@/types/types";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { Box, HStack, VStack, Text, Image } from "@chakra-ui/react";
import { IoArrowRedo } from "react-icons/io5";
import { useState } from "react";
import "@/assets/commentEditor.css";
import "react-quill/dist/quill.snow.css";
import CommentQuill from "./commentQuill";
import ImgWithZoom from "../imgWithZoom";

export default function DetailSubComment({
  comment,
  submitComment,
}: DetailComment) {
  const [writeComment, setWriteComment] = useState(false);

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
            <Text color="gray.500" fontSize="sm" fontWeight={600}>
              {timeAgo(comment.create_time)}
            </Text>
          </HStack>
          <Box ml={6} w={"100%"}>
            <Text as="span" color={ALL_COLOR.YELLOW} fontWeight={600}>
              @{comment.parent_nick_name}
            </Text>
            <ImgWithZoom content={comment.contents} />
          </Box>
        </VStack>
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
        {writeComment && (
          // 대댓의 대댓이라 1씩 증가
          <CommentQuill
            submitComment={submitComment}
            setWriteComment={setWriteComment}
            comment={comment}
            depth={comment.depth + 1}
          />
        )}
      </Box>
    </VStack>
  );
}
