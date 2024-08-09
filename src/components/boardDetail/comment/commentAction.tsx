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
import CommentAdmin from "./commentAdmin";

export default function CommentAction({
  comment,
  onLike,
  onOpen,
  onClickDelete,
}: CommentAction) {
  const { user } = useAppStore((state) => state);
  const { data: session } = useSession();

  const onClickLikeOrDis = async (type: string) => {
    if (!session || !user) {
      alert("로그인한 사용자만 가능합니다.");
    } else if (comment.is_delete_by_admin || comment.is_delete_by_user) {
      alert("삭제된 글은 추천이나 비추천을할 수 없습니다.");
    } else {
      await onLike(comment.id, type);
    }
  };

  const checkReport = () => {
    return (
      session &&
      user &&
      !user.user.is_admin &&
      !comment.is_delete_by_admin &&
      !comment.is_delete_by_user
    );
  };

  return (
    <HStack spacing={1}>
      <Box
        display="flex"
        alignItems="center"
        bg={"none"}
        w={"60px"}
        cursor={"pointer"}
        onClick={() => onClickLikeOrDis("like")}
      >
        <Text
          fontWeight={600}
          color={comment.is_liked_by_user && ALL_COLOR.YELLOW}
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
        onClick={() => onClickLikeOrDis("dislike")}
      >
        <Text
          fontWeight={600}
          color={comment.is_disliked_by_user && ALL_COLOR.YELLOW}
          _hover={{ color: ALL_COLOR.DARK_GRAY }}
          display={"flex"}
          alignItems={"center"}
        >
          <MdOutlineThumbDown /> &nbsp;&nbsp;{comment.dislike_count}
        </Text>
      </Box>
      {checkReport() && (
        <Box
          display="flex"
          alignItems="center"
          bg={"none"}
          w={"60px"}
          cursor={"pointer"}
          onClick={() => onOpen()}
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
      {session && user && user.user.is_admin && (
        <CommentAdmin comment={comment} onClickDelete={onClickDelete} />
      )}
    </HStack>
  );
}
