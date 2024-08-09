"use client";

import { ALL_COLOR } from "@/util/consts/colorConsts";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  Box,
  Text,
  Button,
  Input,
} from "@chakra-ui/react";
import type { ProfileExit } from "@/types/types";
import { useState } from "react";
import "@/assets/input.css";

export default function ProfileExit({ userExit }: ProfileExit) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [nickName, setNickname] = useState("");

  return (
    <Box
      mt={6}
      w={"100%"}
      display={"flex"}
      justifyContent={"flex-end"}
      alignItems={"center"}
    >
      <Button
        onClick={onOpen}
        fontWeight={600}
        border={"1px solid"}
        borderRadius={"lg"}
        _hover={{ bg: ALL_COLOR.LIGHT_GRAY }}
      >
        회원 탈퇴
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent mt={"18%"}>
          <ModalBody
            bg={ALL_COLOR.BLACK}
            border={"1px solid"}
            borderRadius={"lg"}
          >
            <Text fontWeight={600} mt={4}>
              회원 탈퇴를 원하시면 닉네임을 입력해주세요
            </Text>
            <Text fontWeight={600} mt={4} color={ALL_COLOR.YELLOW}>
              탈퇴 시점으로 30일간 회원정보는 복구 가능합니다.
            </Text>
            <Input
              placeholder="닉네임"
              bg={ALL_COLOR.BLACK}
              borderColor={ALL_COLOR.WHITE}
              fontWeight={600}
              value={nickName}
              onChange={(e) => setNickname(e.target.value)}
              mb={"40px"}
              mt={"40px"}
            />
            <Box
              w={"100%"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"flex-end"}
            >
              <Button
                fontWeight={600}
                border={"1px solid"}
                borderRadius={"lg"}
                _hover={{ bg: ALL_COLOR.LIGHT_GRAY }}
                mb={4}
                mr={4}
                onClick={() => userExit(nickName)}
              >
                탈퇴
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
    </Box>
  );
}
