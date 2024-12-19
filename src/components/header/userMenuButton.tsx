"use client";

import { useAppStore } from "@/store/provider";
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
  VStack,
} from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import { fetchUserData } from "@/lib/api";
import Link from "next/link";
import USER_API_ENDPOINTS from "@/config/userEndPoints";
import { useState } from "react";

export default function UserMenuButton({
  main,
  userInfo,
  selectedMenu,
  changeMenu,
  setQuest,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, setUser } = useAppStore((state) => state);
  const { data: session } = useSession();
  const [nickName, setNickname] = useState("");

  const logOut = () => {
    setUser(null);
    signOut();
  };

  const userExit = async (nickName: string) => {
    try {
      if (nickName !== user.user.nick_name) {
        return alert("닉네임이 다릅니다.");
      }

      const response = await fetchUserData(
        USER_API_ENDPOINTS.DELETE_USER,
        "POST",
        {},
        session
      );

      if (response.status === 200 && response.data) {
        alert("회원 탈퇴가 완료 되었습니다. 그동안 감사했습니다.");
        // onClose();
        signOut();
      } else {
        alert("잠시후 다시 시도해주세요");
        location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      onMouseEnter={() => changeMenu(main.value)}
      variant="solid"
      fontWeight="bold"
      bg="transparent"
      _hover={{ bg: ALL_COLOR.LIGHT_GRAY }}
      color={ALL_COLOR.WHITE}
      p="4"
      boxShadow="none"
      backdropFilter="blur(8px)"
      backdropContrast="60%"
      cursor="default"
    >
      {userInfo.nick_name}
      {selectedMenu === main.value && (
        <VStack
          align="stretch"
          p={4}
          position="absolute"
          top="50px"
          onMouseEnter={() => changeMenu(main.value)}
          onMouseLeave={() => changeMenu(null)}
          bg={ALL_COLOR.MAP_BLACK}
          borderRadius="lg"
        >
          <>
            <Box
              p={2}
              onClick={logOut}
              _hover={{ bg: ALL_COLOR.LIGHT_GRAY }}
              borderRadius="lg"
            >
              로그아웃
            </Box>
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
          </>

          {main.sub_menus.map((sub) =>
            sub.value === "USER_DELETE" ? (
              <Box
                p={2}
                key={sub.value}
                onClick={onOpen}
                _hover={{ bg: ALL_COLOR.LIGHT_GRAY }}
                borderRadius="lg"
              >
                {sub.kr_name}
              </Box>
            ) : (
              <Link
                key={sub.value}
                onClick={() => setQuest(sub.parent_value, sub.value)}
                href={sub.link}
              >
                <Box
                  p={2}
                  _hover={{ bg: ALL_COLOR.LIGHT_GRAY }}
                  borderRadius="lg"
                >
                  {sub.kr_name}
                </Box>
              </Link>
            )
          )}
        </VStack>
      )}
    </Button>
  );
}
