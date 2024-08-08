"use client";

import { useAppStore } from "@/store/provider";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import {
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  Box,
  Text,
  Button,
  Input,
  Select,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaShareFromSquare } from "react-icons/fa6";
import { MdOutlineReport } from "react-icons/md";
import type { DetailAction } from "@/types/types";
import { fetchUserData } from "@/lib/api";
import USER_API_ENDPOINTS from "@/config/userEndPoints";
import "@/assets/input.css";
import { useState } from "react";

export default function DetailAction({ post }: DetailAction) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [reason, setReason] = useState("");
  const [selectReson, setSelectReason] = useState("");
  const pathname = usePathname();
  const { user } = useAppStore((state) => state);
  const { data: session } = useSession();

  const reportPost = async () => {
    try {
      let finalReason = "";
      if (selectReson !== "other") {
        finalReason = selectReson;
      } else {
        finalReason = reason;
      }

      const response = await fetchUserData(
        USER_API_ENDPOINTS.REPORT_POST,
        "POST",
        { board_id: post.id, board_type: post.type, reason: finalReason },
        session
      );
      if (response.status === 200) {
        alert("해당 게시글이 신고되었습니다.");
        onClose();
      } else {
        alert("잠시후 다시 시도해주세요");
        onClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(
        `${process.env.NEXT_PUBLIC_SITE_URL}${pathname}`
      );
      alert("클립 보드에 복사 되었습니다.");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <HStack cursor="pointer" mt={4} justify="flex-end">
        {session && user && user.user.email === post.writer && (
          <Box as="span" display="flex" alignItems="center">
            <Button
              _hover={{ bg: ALL_COLOR.DARK_GRAY }}
              border={"1px solid"}
              borderColor={ALL_COLOR.WHITE}
              w={"80px"}
              bg={ALL_COLOR.BLACK}
            >
              <FaRegTrashAlt />
              &nbsp;
              <Text fontWeight={600}>삭제</Text>
            </Button>
          </Box>
        )}
        <Box as="span" display="flex" alignItems="center">
          <Button
            _hover={{ bg: ALL_COLOR.DARK_GRAY }}
            border={"1px solid"}
            borderColor={ALL_COLOR.WHITE}
            w={"80px"}
            bg={ALL_COLOR.BLACK}
            onClick={() => copyToClipboard()}
          >
            <FaShareFromSquare />
            &nbsp;
            <Text fontWeight={600}>공유</Text>
          </Button>
        </Box>
        <Box as="span" display="flex" alignItems="center">
          <Button
            _hover={{ bg: ALL_COLOR.DARK_GRAY }}
            border={"1px solid"}
            borderColor={ALL_COLOR.WHITE}
            w={"80px"}
            bg={ALL_COLOR.BLACK}
            onClick={onOpen}
          >
            <MdOutlineReport />
            &nbsp;
            <Text fontWeight={600}>신고</Text>
          </Button>
        </Box>
      </HStack>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent mt={"18%"}>
          <ModalBody
            bg={ALL_COLOR.BLACK}
            border={"1px solid"}
            borderRadius={"lg"}
          >
            <Text fontWeight={600} mb={4} mt={4}>
              신고 사유를 선택하거나 입력해주세요
            </Text>
            <Select
              border={"1px solid"}
              borderColor={ALL_COLOR.WHITE}
              placeholder="신고 사유를 선택하세요"
              onChange={(e) => setSelectReason(e.target.value)}
              value={selectReson}
            >
              <option value="스팸">스팸</option>
              <option value="혐오/폭력">혐오/폭력</option>
              <option value="괴롭힘">괴롭힘</option>
              <option value="허위 정보">허위 정보</option>
              <option value="other">기타</option>
            </Select>
            {selectReson === "other" && (
              <Input
                placeholder="신고 사유"
                bg={ALL_COLOR.BLACK}
                borderColor={ALL_COLOR.WHITE}
                fontWeight={600}
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                mt={"20px"}
              />
            )}
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
                onClick={() => reportPost()}
              >
                신고
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
    </>
  );
}
