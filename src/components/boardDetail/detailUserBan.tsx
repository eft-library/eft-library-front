"use client";

import type { PostBan } from "@/types/types";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import {
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Select,
  Text,
} from "@chakra-ui/react";
import USER_API_ENDPOINTS from "@/config/userEndPoints";
import { fetchUserData } from "@/lib/api";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useAppStore } from "@/store/provider";

export default function DetailUserBan({ post, isOpen, onClose }: PostBan) {
  const { user } = useAppStore((state) => state);
  const [reason, setReason] = useState("");
  const [banTime, setBanTime] = useState("");
  const { data: session } = useSession();

  const onClickBan = async () => {
    if (reason.length < 1) {
      alert("제재 사유를 작성해주세요");
    } else if (banTime.length < 1) {
      alert("제재 기간을 선택해주세요");
    } else {
      let finalBanTime = 0;

      if (banTime !== "always") {
        finalBanTime = Number(banTime);
      } else {
        finalBanTime = 999999;
      }

      try {
        const response = await fetchUserData(
          USER_API_ENDPOINTS.BAN_USER,
          "POST",
          {
            user_email: post.writer,
            admin_email: user.user.email,
            ban_reason: reason,
            ban_time: finalBanTime,
          },
          session
        );
        if (response.status === 200) {
          alert("해당 사용자를 제재하였습니다");
          onClose();
        } else {
          alert("잠시후 다시 시도해주세요");
          onClose();
        }
      } catch (error) {
        console.log(error);
      }
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
            해당 사용자를 제재 하시겠습니까?
          </Text>
          <Select
            border={"1px solid"}
            borderColor={ALL_COLOR.WHITE}
            placeholder="신고 사유를 선택하세요"
            onChange={(e) => setBanTime(e.target.value)}
            value={banTime}
          >
            <option value="1">1일</option>
            <option value="3">3일</option>
            <option value="7">7일</option>
            <option value="30">30일</option>
            <option value="always">영구정지</option>
          </Select>
          <Input
            placeholder="제재 사유"
            bg={ALL_COLOR.BLACK}
            borderColor={ALL_COLOR.WHITE}
            fontWeight={600}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            mt={"20px"}
          />
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
              onClick={onClickBan}
            >
              밴
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
