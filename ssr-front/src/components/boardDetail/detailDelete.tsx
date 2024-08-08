"use client";

import USER_API_ENDPOINTS from "@/config/userEndPoints";
import { fetchUserData } from "@/lib/api";
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
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import type { DetailReport } from "@/types/types";

export default function DetailDelete({ post, isOpen, onClose }: DetailReport) {
  const { data: session } = useSession();
  const router = useRouter();

  const deletePost = async () => {
    try {
      const response = await fetchUserData(
        USER_API_ENDPOINTS.DELETE_POST,
        "POST",
        { board_id: post.id, board_type: post.type },
        session
      );
      if (response.status === 200) {
        alert("해당 게시글이 삭제되었습니다.");
        router.push(`/board/${post.type}?id=1`);
      } else {
        alert("잠시후 다시 시도해주세요");
      }
    } catch (error) {
      console.error(error);
    }
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
              onClick={() => deletePost()}
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
