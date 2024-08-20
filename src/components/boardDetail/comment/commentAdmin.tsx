"use client";

import { ALL_COLOR } from "@/util/consts/colorConsts";
import {
  Text,
  Popover,
  PopoverTrigger,
  Box,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  useDisclosure,
} from "@chakra-ui/react";
import { HiDotsVertical } from "react-icons/hi";
import CommentDelete from "./commentDelete";
import type { CommentAdmin } from "@/types/types";
import CommentUserBan from "./commentUserBan";
import Link from "next/link";
import { useAppStore } from "@/store/provider";

export default function CommentAdmin({ comment, onClickDelete }: CommentAdmin) {
  const { setSearchUser } = useAppStore((state) => state);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const onClickUserProfile = () => {
    setSearchUser(comment.user_email);
  };
  const {
    isOpen: isBanOpen,
    onOpen: onBanOpen,
    onClose: onBanClose,
  } = useDisclosure();
  return (
    <Popover>
      <PopoverTrigger>
        <Box
          display="flex"
          alignItems="center"
          bg={"none"}
          w={"10px"}
          cursor={"pointer"}
        >
          <Text
            fontWeight={600}
            _hover={{ color: ALL_COLOR.DARK_GRAY }}
            display={"flex"}
            alignItems={"center"}
          >
            <HiDotsVertical />
          </Text>
        </Box>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader textAlign={"center"}>관리</PopoverHeader>
        <PopoverBody>
          <Link href={"/user/post?id=1"}>
            <Text
              onClick={onClickUserProfile}
              fontWeight={600}
              _hover={{ color: ALL_COLOR.DARK_GRAY }}
              cursor={"pointer"}
              mb={2}
            >
              사용자 정보
            </Text>
          </Link>
          {!comment.is_delete_by_admin && !comment.is_delete_by_user && (
            <Text
              fontWeight={600}
              mb={2}
              _hover={{ color: ALL_COLOR.DARK_GRAY }}
              cursor={"pointer"}
              onClick={onOpen}
            >
              댓글 삭제
            </Text>
          )}
          {!comment.ban_end_time && (
            <Text
              fontWeight={600}
              _hover={{ color: ALL_COLOR.DARK_GRAY }}
              cursor={"pointer"}
              onClick={onBanOpen}
            >
              사용자 제재
            </Text>
          )}
        </PopoverBody>
      </PopoverContent>

      <CommentDelete
        onClose={onClose}
        isOpen={isOpen}
        comment={comment}
        commentDelete={onClickDelete}
        isUser={false}
      />
      <CommentUserBan
        isOpen={isBanOpen}
        onClose={onBanClose}
        comment={comment}
      />
    </Popover>
  );
}
