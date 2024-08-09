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

export default function CommentAdmin({ comment, onClickDelete }: CommentAdmin) {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
          <Text
            fontWeight={600}
            mb={4}
            _hover={{ color: ALL_COLOR.DARK_GRAY }}
            cursor={"pointer"}
            onClick={onOpen}
          >
            댓글 삭제
          </Text>
          <Text
            fontWeight={600}
            _hover={{ color: ALL_COLOR.DARK_GRAY }}
            cursor={"pointer"}
          >
            사용자 밴
          </Text>
        </PopoverBody>
      </PopoverContent>

      <CommentDelete
        onClose={onClose}
        isOpen={isOpen}
        comment={comment}
        commentDelete={onClickDelete}
        isUser={false}
      />
    </Popover>
  );
}
