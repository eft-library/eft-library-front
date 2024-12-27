"use client";
import { usePathname, useRouter } from "next/navigation";
import { Box, Text } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";

export default function InformationTab() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Box w={"100%"} display={"flex"} justifyContent={"center"}>
      <Box
        bg={ALL_COLOR.BACKGROUND}
        w={"50%"}
        h={"100px"}
        display={"flex"}
        justifyContent={"space-evenly"}
        alignItems={"center"}
        borderRadius={"500"}
        border={"1px solid white"}
        mb={10}
      >
        <Box
          w={"30%"}
          bg={
            pathname === "/notice" ? ALL_COLOR.LIGHT_GRAY : ALL_COLOR.BACKGROUND
          }
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          border={"1px solid white"}
          cursor={"pointer"}
          _hover={{ bg: ALL_COLOR.LIGHT_GRAY }}
          h={"80%"}
          onClick={() => router.push("/notice?id=1")}
          borderRadius={"500"}
        >
          <Text fontWeight={600} fontSize={"lg"}>
            공지사항
          </Text>
        </Box>
        <Box
          w={"30%"}
          border={"1px solid white"}
          display={"flex"}
          bg={
            pathname === "/patch-notes"
              ? ALL_COLOR.LIGHT_GRAY
              : ALL_COLOR.BACKGROUND
          }
          cursor={"pointer"}
          _hover={{ bg: ALL_COLOR.LIGHT_GRAY }}
          justifyContent={"center"}
          h={"80%"}
          alignItems={"center"}
          borderRadius={"500"}
          onClick={() => router.push("/patch-notes?id=1")}
        >
          <Text fontWeight={600} fontSize={"lg"}>
            패치노트
          </Text>
        </Box>
        <Box
          w={"30%"}
          bg={
            pathname === "/event" ? ALL_COLOR.LIGHT_GRAY : ALL_COLOR.BACKGROUND
          }
          border={"1px solid white"}
          _hover={{ bg: ALL_COLOR.LIGHT_GRAY }}
          display={"flex"}
          h={"80%"}
          justifyContent={"center"}
          cursor={"pointer"}
          alignItems={"center"}
          borderRadius={"500"}
          onClick={() => router.push("/event?id=1")}
        >
          <Text fontWeight={600} fontSize={"lg"}>
            이벤트
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
