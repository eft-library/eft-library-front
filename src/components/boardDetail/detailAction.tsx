"use client";

import { useAppStore } from "@/store/provider";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import { HStack, useDisclosure, Box, Text, Button } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaShareFromSquare } from "react-icons/fa6";
import { MdOutlineReport } from "react-icons/md";
import type { DetailAction } from "@/types/types";
import "@/assets/input.css";
import DetailReport from "./detailReport";
import DetailDelete from "./detailDelete";

export default function DetailAction({ post, setIsWrite }: DetailAction) {
  const {
    isOpen: isReportOpen,
    onOpen: onReportOpen,
    onClose: onReportClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const pathname = usePathname();
  const { user } = useAppStore((state) => state);
  const { data: session } = useSession();

  const openReport = () => {
    if (!session) {
      alert("로그인 후 사용가능합니다.");
    } else {
      onReportOpen();
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

  const checkDelete = () => {
    if (!session || !user) return false;

    const isUserOwner = user.user.email === post.writer;
    const isAdmin = user.user.is_admin;

    return isUserOwner || isAdmin;
  };

  return (
    <>
      <HStack cursor="pointer" mt={4} justify="flex-end">
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
        {checkDelete() && (
          <Box as="span" display="flex" alignItems="center">
            <Button
              _hover={{ bg: ALL_COLOR.DARK_GRAY }}
              border={"1px solid"}
              borderColor={ALL_COLOR.WHITE}
              bg={ALL_COLOR.BLACK}
              w={"80px"}
              onClick={() => setIsWrite(true)}
            >
              <FaRegTrashAlt />
              &nbsp;
              <Text fontWeight={600}>수정</Text>
            </Button>
          </Box>
        )}
        {checkDelete() && (
          <Box as="span" display="flex" alignItems="center">
            <Button
              _hover={{ bg: ALL_COLOR.DARK_GRAY }}
              border={"1px solid"}
              borderColor={ALL_COLOR.WHITE}
              bg={ALL_COLOR.BLACK}
              w={"80px"}
              onClick={onDeleteOpen}
            >
              <FaRegTrashAlt />
              &nbsp;
              <Text fontWeight={600}>삭제</Text>
            </Button>
          </Box>
        )}
        {session && user && !user.user.is_admin && (
          <Box as="span" display="flex" alignItems="center">
            <Button
              _hover={{ bg: ALL_COLOR.DARK_GRAY }}
              border={"1px solid"}
              borderColor={ALL_COLOR.WHITE}
              w={"80px"}
              bg={ALL_COLOR.BLACK}
              onClick={openReport}
            >
              <MdOutlineReport />
              &nbsp;
              <Text fontWeight={600}>신고</Text>
            </Button>
          </Box>
        )}
      </HStack>
      <DetailReport isOpen={isReportOpen} onClose={onReportClose} post={post} />
      <DetailDelete isOpen={isDeleteOpen} onClose={onDeleteClose} post={post} />
    </>
  );
}
