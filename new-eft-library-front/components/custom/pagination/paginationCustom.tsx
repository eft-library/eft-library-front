"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

interface PaginationCustom {
  total: number;
  routeLink: string;
  currentPage: number;
}

export default function PaginationCustom({
  total,
  routeLink,
  currentPage,
}: PaginationCustom) {
  const [visiblePages, setVisiblePages] = useState<number[]>([]);
  const router = useRouter();

  useEffect(() => {
    // 페이지 그룹 초기화
    updateVisiblePages(currentPage);
  }, [total, currentPage]);

  const updateVisiblePages = (page: number) => {
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

  const handlePageChange = (page: number) => {
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
  const handelNextPage = () => {
    handlePageChange(currentPage + 1);
  };
  const handelPrevPage = () => {
    handlePageChange(currentPage - 1);
  };

  return (
    <Pagination>
      <PaginationContent className={"flex gap-3"}>
        <PaginationItem>
          <PaginationLink
            onClick={handleFirstPage}
            className={cn(
              "border-[1px] border-white border-solid",
              currentPage === 1
                ? "cursor-not-allowed opacity-50 hover:bg-NeutralGray"
                : "hover:bg-gray-200"
            )}
          >
            <span className={"font-bold text-lg"}>{"<<"}</span>
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            onClick={handelPrevPage}
            className={cn(
              "border-[1px] border-white border-solid",
              currentPage === 1
                ? "cursor-not-allowed opacity-50 hover:bg-NeutralGray"
                : "hover:bg-gray-200"
            )}
          >
            <span className={"font-bold text-lg"}>{"<"}</span>
          </PaginationLink>
        </PaginationItem>
        {visiblePages.map((page) => (
          <PaginationItem
            key={`pagination-${page}`}
            onClick={() => handlePageChange(page)}
          >
            <PaginationLink
              className={
                "hover:bg-NeutralGray border-[1px] border-white border-solid flex items-center"
              }
              isActive={page === currentPage}
            >
              <span className={"font-bold text-lg "}>{page}</span>
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationLink
            onClick={handelNextPage}
            className={cn(
              "border-[1px] border-white border-solid",
              currentPage === total
                ? "cursor-not-allowed opacity-50 hover:bg-NeutralGray"
                : "hover:bg-NeutralGray"
            )}
          >
            <span className={"font-bold text-lg"}>{">"}</span>
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            onClick={handleLastPage}
            className={cn(
              "border-[1px] border-white border-solid",
              currentPage === total
                ? "cursor-not-allowed opacity-50 hover:bg-NeutralGray"
                : "hover:bg-NeutralGray"
            )}
          >
            <span className={"font-bold text-lg"}>{">>"}</span>
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
