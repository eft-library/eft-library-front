"use client";

import { ALL_COLOR } from "@/util/consts/colorConsts";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import type { CommentDetele } from "@/types/types";

export default function CommentDelete({
  comment,
  isOpen,
  onClose,
  commentDelete,
}: CommentDetele) {
  const onClickDelete = async () => {
    await commentDelete(comment.id, true);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent mt={"18%"}>
        <ModalBody
          bg={ALL_COLOR.BLACK}
          border={"1px solid"}
          borderRadius={"lg"}
        >
          <Text fontWeight={600} mb={4} mt={4}>
            해당 게시글을 삭제 하시겠습니까?
          </Text>
          <Box
            w={"100%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"flex-end"}
            mt={6}
          >
            <Button
              fontWeight={600}
              border={"1px solid"}
              borderRadius={"lg"}
              _hover={{ bg: ALL_COLOR.LIGHT_GRAY }}
              mb={4}
              mr={4}
              onClick={onClickDelete}
            >
              삭제
            </Button>
            <Button
              fontWeight={600}
              border={"1px solid"}
              borderRadius={"lg"}
              _hover={{ bg: ALL_COLOR.LIGHT_GRAY }}
              mb={4}
              onClick={onClose}
            >
              취소
            </Button>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
