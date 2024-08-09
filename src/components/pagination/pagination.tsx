"use client";

import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Box } from "@chakra-ui/react";
import { ALL_COLOR } from "@/util/consts/colorConsts";
import type { Pagination } from "@/types/types";
import { useRouter } from "next/navigation";

export default function Pagination({
  total,
  routeLink,
  currentPage,
}: Pagination) {
  const [visiblePages, setVisiblePages] = useState([]);
  const router = useRouter();

  useEffect(() => {
    // 페이지 그룹 초기화
    updateVisiblePages(currentPage);
  }, [total, currentPage]);

  const updateVisiblePages = (page) => {
    const totalPages = Math.min(total, 10); // 최대 10페이지
    const halfRange = Math.floor(totalPages / 2);

    // 페이지 범위 계산
    let startPage = Math.max(page - halfRange, 1);
    let endPage = Math.min(startPage + totalPages - 1, total);

    // 페이지 범위가 끝을 넘어설 경우 조정
    if (endPage - startPage < totalPages - 1) {
      startPage = Math.max(endPage - totalPages + 1, 1);
    }

    // 페이지 그룹에 현재 페이지가 포함되도록 조정
    if (page < startPage || page > endPage) {
      startPage = Math.max(page - halfRange, 1);
      endPage = Math.min(startPage + totalPages - 1, total);

      // 페이지 범위가 끝을 넘어설 경우 조정
      if (endPage - startPage < totalPages - 1) {
        startPage = Math.max(endPage - totalPages + 1, 1);
      }
    }

    // 페이지 그룹 설정
    const newPages = [];
    for (let i = startPage; i <= endPage; i++) {
      newPages.push(i);
    }
    setVisiblePages(newPages);
  };

  const handlePageChange = (page) => {
    if (page === currentPage) return; // 현재 페이지와 동일한 페이지 클릭 시 무시

    // 클릭한 페이지를 기준으로 페이지 그룹 업데이트
    updateVisiblePages(page);

    router.push(routeLink + page);
  };

  const handleFirstPage = () => {
    handlePageChange(1);
  };

  const handleLastPage = () => {
    handlePageChange(total);
  };

  return (
    <Box
      w={"100%"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
      mt={10}
    >
      <ButtonGroup mb={4}>
        <Button
          onClick={handleFirstPage}
          outline={"1px solid"}
          outlineColor={ALL_COLOR.WHITE}
          isDisabled={currentPage === 1}
          bg={ALL_COLOR.BLACK}
          color={ALL_COLOR.WHITE}
          _hover={{ bg: ALL_COLOR.DARK_GRAY }}
        >
          {"<<"}
        </Button>
        {visiblePages.map((page) => (
          <Button
            key={page}
            outline={"1px solid"}
            outlineColor={ALL_COLOR.WHITE}
            onClick={() => handlePageChange(page)}
            isDisabled={page > total}
            bg={page === currentPage ? ALL_COLOR.LIGHT_GRAY : ALL_COLOR.BLACK}
            color={ALL_COLOR.WHITE}
            _hover={{ bg: ALL_COLOR.DARK_GRAY }}
          >
            {page}
          </Button>
        ))}
        <Button
          onClick={handleLastPage}
          outline={"1px solid"}
          outlineColor={ALL_COLOR.WHITE}
          isDisabled={currentPage === total}
          bg={ALL_COLOR.BLACK}
          color={ALL_COLOR.WHITE}
          _hover={{ bg: ALL_COLOR.DARK_GRAY }}
        >
          {">>"}
        </Button>
      </ButtonGroup>
    </Box>
  );
}
