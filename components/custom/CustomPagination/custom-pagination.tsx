"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { PaginationCustomTypes } from "./custom-pagination.types";

export default function CustomPagination({
  total,
  routeLink,
  currentPage,
}: PaginationCustomTypes) {
  const [visiblePages, setVisiblePages] = useState<number[]>([]);
  const router = useRouter();

  const updateVisiblePages = useCallback(
    (page: number) => {
      const maxPagesToShow = 10;
      const totalPages = total;

      let startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2));
      const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

      if (endPage - startPage + 1 < maxPagesToShow) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
      }

      const newPages = [];
      for (let i = startPage; i <= endPage; i++) {
        newPages.push(i);
      }
      setVisiblePages(newPages);
    },
    [total]
  );

  useEffect(() => {
    updateVisiblePages(currentPage);
  }, [total, currentPage, updateVisiblePages]);

  const handlePageChange = (page: number) => {
    if (page === currentPage || page < 1 || page > total) return; // Ignore if same page or out of bounds
    updateVisiblePages(page);
    router.push(routeLink + page);
  };

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === total;

  return (
    <Pagination>
      <PaginationContent className="flex gap-1 sm:gap-2">
        {/* First Page Button */}
        <PaginationItem>
          <PaginationLink
            onClick={() => handlePageChange(1)}
            className={cn(
              "border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer",
              {
                "pointer-events-none opacity-50 cursor-default": isFirstPage,
              }
            )}
            aria-disabled={isFirstPage}
          >
            <ChevronsLeft className="h-4 w-4" />
            <span className="sr-only">First page</span>
          </PaginationLink>
        </PaginationItem>

        {/* Previous Page Button */}
        <PaginationItem>
          <PaginationLink
            onClick={() => handlePageChange(currentPage - 1)}
            className={cn(
              "border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer",
              {
                "pointer-events-none opacity-50 cursor-default": isFirstPage,
              }
            )}
            aria-disabled={isFirstPage}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous page</span>
          </PaginationLink>
        </PaginationItem>

        {/* Page Number Links */}
        {visiblePages.map((page) => (
          <PaginationItem key={`pagination-${page}`}>
            <PaginationLink
              onClick={() => handlePageChange(page)}
              className={cn(
                "border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer",
                {
                  "bg-primary text-primary-foreground dark:text-white hover:bg-primary hover:text-primary-foreground cursor-default":
                    page === currentPage,
                }
              )}
              isActive={page === currentPage}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Next Page Button */}
        <PaginationItem>
          <PaginationLink
            onClick={() => handlePageChange(currentPage + 1)}
            className={cn(
              "border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer",
              {
                "pointer-events-none opacity-50 cursor-default": isLastPage,
              }
            )}
            aria-disabled={isLastPage}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </PaginationLink>
        </PaginationItem>

        {/* Last Page Button */}
        <PaginationItem>
          <PaginationLink
            onClick={() => handlePageChange(total)}
            className={cn(
              "border border-input bg-background text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer",
              {
                "pointer-events-none opacity-50 cursor-default": isLastPage,
              }
            )}
            aria-disabled={isLastPage}
          >
            <ChevronsRight className="h-4 w-4" />
            <span className="sr-only">Last page</span>
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
