"use client";

import { useTheme } from "next-themes";
import ImageBox from "@/components/ui/ImageBox";
import NewsCard from "@/components/ui/NewsCard";
import { FlameIcon as Fire, Pin } from "lucide-react";
import NewsData from "./News/NewsData";

export default function MainView() {
  const { theme } = useTheme();
  const gridItems = [
    {
      id: 1,
      title: "타르코프 지도",
      image: "/placeholder.svg?height=120&width=120",
    },
    {
      id: 2,
      title: "대화형 지도",
      image: "/placeholder.svg?height=120&width=120",
    },
    { id: 3, title: "퀘스트", image: "/placeholder.svg?height=120&width=120" },
    {
      id: 4,
      title: "퀘스트 로드맵",
      image: "/placeholder.svg?height=120&width=120",
    },
    {
      id: 5,
      title: "퀘스트 플래너",
      image: "/placeholder.svg?height=120&width=120",
    },
    {
      id: 6,
      title: "아이템 시세",
      image: "/placeholder.svg?height=120&width=120",
    },
    {
      id: 7,
      title: "아이템 랭크",
      image: "/placeholder.svg?height=120&width=120",
    },
    { id: 8, title: "무기", image: "/placeholder.svg?height=120&width=120" },
    { id: 9, title: "탄약", image: "/placeholder.svg?height=120&width=120" },
    { id: 10, title: "방탄모", image: "/placeholder.svg?height=120&width=120" },
    { id: 11, title: "헤드셋", image: "/placeholder.svg?height=120&width=120" },
    {
      id: 12,
      title: "전술 조끼",
      image: "/placeholder.svg?height=120&width=120",
    },
    {
      id: 13,
      title: "방탄 조끼",
      image: "/placeholder.svg?height=120&width=120",
    },
    { id: 14, title: "가방", image: "/placeholder.svg?height=120&width=120" },
    { id: 15, title: "전리품", image: "/placeholder.svg?height=120&width=120" },
    { id: 16, title: "의료품", image: "/placeholder.svg?height=120&width=120" },
    { id: 17, title: "음식", image: "/placeholder.svg?height=120&width=120" },
    { id: 18, title: "열쇠", image: "/placeholder.svg?height=120&width=120" },
    {
      id: 19,
      title: "컨테이너",
      image: "/placeholder.svg?height=120&width=120",
    },
    { id: 20, title: "화폐", image: "/placeholder.svg?height=120&width=120" },
    {
      id: 21,
      title: "트레이더",
      image: "/placeholder.svg?height=120&width=120",
    },
    { id: 22, title: "은신처", image: "/placeholder.svg?height=120&width=120" },
    { id: 23, title: "스킬", image: "/placeholder.svg?height=120&width=120" },
    { id: 24, title: "업적", image: "/placeholder.svg?height=120&width=120" },
    { id: 25, title: "통계", image: "/placeholder.svg?height=120&width=120" },
    { id: 26, title: "계산기", image: "/placeholder.svg?height=120&width=120" },
    { id: 27, title: "도구", image: "/placeholder.svg?height=120&width=120" },
    { id: 28, title: "가이드", image: "/placeholder.svg?height=120&width=120" },
    { id: 29, title: "팁", image: "/placeholder.svg?height=120&width=120" },
    { id: 30, title: "뉴스", image: "/placeholder.svg?height=120&width=120" },
    {
      id: 31,
      title: "업데이트",
      image: "/placeholder.svg?height=120&width=120",
    },
    {
      id: 32,
      title: "패치노트",
      image: "/placeholder.svg?height=120&width=120",
    },
    {
      id: 33,
      title: "커뮤니티",
      image: "/placeholder.svg?height=120&width=120",
    },
  ];

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
            <NewsData />

            {/* Grid Layout */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {gridItems.map((item) => (
                <ImageBox item={item} key={item.id} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 space-y-6">
            {/* Trending Posts */}
            <div
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
            </div>

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
