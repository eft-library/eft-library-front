import { Box, Text, HStack } from "@chakra-ui/react";
import {
  MdOutlineThumbDown,
  MdOutlineThumbUp,
  MdOutlineReport,
} from "react-icons/md";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { useAppStore } from "@/store/provider";
import { useSession } from "next-auth/react";
import type { CommentAction } from "@/types/types";

export default function CommentAction({
  comment,
  onLike,
  onDislike,
  onReport,
}: CommentAction) {
  const { user } = useAppStore((state) => state);
  const { data: session } = useSession();

  const onClickLike = async () => {
    if (!session || !user) {
      alert("로그인한 사용자만 가능합니다.");
    } else if (comment.is_delete_by_admin || comment.is_delete_by_user) {
      alert("삭제된 글은 추천할 수 없습니다.");
    } else {
      await onLike();
    }
  };

  const onClickDisLike = async () => {
    if (!session || !user) {
      alert("로그인한 사용자만 가능합니다.");
    } else if (comment.is_delete_by_admin || comment.is_delete_by_user) {
      alert("삭제된 글은 비추천할 수 없습니다.");
    } else {
      await onDislike();
    }
  };

  const onClickReport = async () => {
    await onReport();
  };

  return (
    <HStack spacing={1}>
      <Box
        display="flex"
        alignItems="center"
        bg={"none"}
        w={"60px"}
        cursor={"pointer"}
        onClick={onClickLike}
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
        onClick={onClickDisLike}
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
      {session && user && (
        <Box
          display="flex"
          alignItems="center"
          bg={"none"}
          w={"60px"}
          cursor={"pointer"}
          onClick={onClickReport}
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
      )}
    </HStack>
  );
}
