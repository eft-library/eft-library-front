"use client";

import { useTheme } from "next-themes";
import { FlameIcon as Fire, Pin } from "lucide-react";
import NewsView from "./News/NewsView";
import GridItem from "./GridItem/GridItem";
import type { MainViewTypes } from "./MainView.types";

export default function MainView({ homeData }: MainViewTypes) {
  const { theme } = useTheme();
  return (
    <div
      className={`min-h-screen ${
        theme === "dark"
          ? "bg-[#1e2124] text-white"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Recommended Info Section */}
            <NewsView news={homeData.news} />

            {/* Grid Layout */}
            <GridItem main_info={homeData.main_info} />
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 space-y-6">
            {/* Trending Posts */}
            {/* <div
              className={`rounded-lg p-6 border ${
                theme === "dark"
                  ? "bg-gray-800/30 border-gray-700/50"
                  : "bg-white border-gray-200 shadow-sm"
              }`}
            >
              <div className="flex items-center space-x-2 mb-4">
                <Fire className="w-5 h-5 text-orange-400" />
                <h2
                  className={`text-lg font-semibold ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  인기 게시물
                </h2>
              </div>
              <div className="space-y-3">
                <div
                  className={`text-sm cursor-pointer transition-colors ${
                    theme === "dark"
                      ? "text-gray-300 hover:text-orange-400"
                      : "text-gray-600 hover:text-orange-500"
                  }`}
                >
                  최신 패치 0.16.7.0 변경사항 정리
                </div>
                <div
                  className={`text-sm cursor-pointer transition-colors ${
                    theme === "dark"
                      ? "text-gray-300 hover:text-orange-400"
                      : "text-gray-600 hover:text-orange-500"
                  }`}
                >
                  초보자를 위한 타르코프 생존 가이드
                </div>
                <div
                  className={`text-sm cursor-pointer transition-colors ${
                    theme === "dark"
                      ? "text-gray-300 hover:text-orange-400"
                      : "text-gray-600 hover:text-orange-500"
                  }`}
                >
                  효율적인 퀘스트 진행 순서
                </div>
                <div
                  className={`text-sm cursor-pointer transition-colors ${
                    theme === "dark"
                      ? "text-gray-300 hover:text-orange-400"
                      : "text-gray-600 hover:text-orange-500"
                  }`}
                >
                  은신처 업그레이드 우선순위
                </div>
              </div>
            </div> */}

            {/* Pinned Notices */}
            <div
              className={`rounded-lg p-6 border ${
                theme === "dark"
                  ? "bg-gray-800/30 border-gray-700/50"
                  : "bg-white border-gray-200 shadow-sm"
              }`}
            >
              <div className="flex items-center space-x-2 mb-4">
                <Pin className="w-5 h-5 text-orange-400" />
                <h2
                  className={`text-lg font-semibold ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  공지사항
                </h2>
              </div>
              <div className="space-y-3">
                <div
                  className={`text-sm cursor-pointer transition-colors ${
                    theme === "dark"
                      ? "text-gray-300 hover:text-orange-400"
                      : "text-gray-600 hover:text-orange-500"
                  }`}
                >
                  사이트 이용 규칙 및 가이드라인
                </div>
                <div
                  className={`text-sm cursor-pointer transition-colors ${
                    theme === "dark"
                      ? "text-gray-300 hover:text-orange-400"
                      : "text-gray-600 hover:text-orange-500"
                  }`}
                >
                  Discord 서버 참여 안내
                </div>
                <div
                  className={`text-sm cursor-pointer transition-colors ${
                    theme === "dark"
                      ? "text-gray-300 hover:text-orange-400"
                      : "text-gray-600 hover:text-orange-500"
                  }`}
                >
                  데이터 업데이트 일정 공지
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
