"use client";

import type { CommunityViewTypes } from "../community.types";
import CategoryTab from "../CategoryTab/category-tab";
import PostGrid from "../PostGrid/post-grid";
import SidebarSearch from "../SideBarSearch/side-bar-search";
import CommunitySideBar from "../CommunitySideBar/community-side-bar";
import CommunitySearch from "../CommunitySearch/community-search";
import { useAppStore } from "@/store/provider";
import { useEffect } from "react";

export default function CommunityView({
  postInfo,
  category,
}: CommunityViewTypes) {
  const { setPageCategory } = useAppStore((state) => state);
  useEffect(() => {
    setPageCategory(category);
  }, [setPageCategory, category]);

  // 1) 페이지 진입 시 이전 스크롤 위치 복원
  useEffect(() => {
    const saved = sessionStorage.getItem("scroll-community-list");
    if (saved) {
      window.scrollTo(0, Number(saved));
    }
  }, []);

  // 2) 스크롤 이동 시 위치 저장
  useEffect(() => {
    const handleScroll = () => {
      sessionStorage.setItem(
        "scroll-community-list",
        window.scrollY.toString()
      );
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          PMC 라운지
        </h1>
        <CategoryTab />
        <div className="md:hidden mt-6">
          <SidebarSearch />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
          <div className="lg:col-span-3">
            <PostGrid postInfo={postInfo} category={category} />
            <CommunitySearch />
          </div>
          <div className="lg:col-span-1">
            <CommunitySideBar />
          </div>
        </div>
      </div>
    </div>
  );
}
