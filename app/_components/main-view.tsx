import NewsView from "./News/news-view";
import GridItem from "./GridItem/grid-item";
import type { MainViewTypes } from "./news-view.types";
import PinnedNotice from "./PinnedNotice/pinned-notice";
import ViewWrapper from "@/components/custom/ViewWrapper/view-wrapper";
import AdBanner from "@/components/custom/Adsense/ad-banner";
import Link from "next/link";
import Image from "next/image";

export default function MainView({ homeData }: MainViewTypes) {
  return (
    <ViewWrapper>
      <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#1e2124] dark:text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
              {/* Recommended Info Section */}
              <NewsView news={homeData.news} />
              <AdBanner
                dataAdFormat={"auto"}
                dataFullWidthResponsive={true}
                dataAdSlot="2690838054"
                maxWidth={880}
              />
              {/* Grid Layout */}
              <GridItem main_info={homeData.main_info} />
            </div>

            {/* Sidebar */}
            <div className="lg:w-80 space-y-6">
              {/* Trending Posts */}
              {/* <div className="rounded-lg p-6 border bg-white border-gray-200 shadow-sm dark:bg-gray-800/30 dark:border-gray-700/50">
              <div className="flex items-center space-x-2 mb-4">
                <Fire className="w-5 h-5 text-orange-400" />
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  인기 게시물
                </h2>
              </div>
              <div className="space-y-3">
                <div className="text-sm cursor-pointer transition-colors text-gray-600 hover:text-orange-500 dark:text-gray-300 dark:hover:text-orange-400">
                  최신 패치 0.16.7.0 변경사항 정리
                </div>
                <div className="text-sm cursor-pointer transition-colors text-gray-600 hover:text-orange-500 dark:text-gray-300 dark:hover:text-orange-400">
                  초보자를 위한 타르코프 생존 가이드
                </div>
                <div className="text-sm cursor-pointer transition-colors text-gray-600 hover:text-orange-500 dark:text-gray-300 dark:hover:text-orange-400">
                  효율적인 퀘스트 진행 순서
                </div>
                <div className="text-sm cursor-pointer transition-colors text-gray-600 hover:text-orange-500 dark:text-gray-300 dark:hover:text-orange-400">
                  은신처 업그레이드 우선순위
                </div>
              </div>
            </div> */}

              {/* Pinned Notices */}
              <PinnedNotice notice={homeData.news} />
              <div className="rounded-lg p-2 border bg-white border-gray-200 shadow-sm dark:bg-gray-800/30 dark:border-gray-700/50">
                <Link
                  href="https://aff.gearupglobal.com/product/download/HSMniDfsEY6c"
                  target="_blank"
                >
                  <Image
                    src="/gearupboosterlogo.webp"
                    alt="gearupbooster"
                    width={300}
                    height={60}
                    className="w-full h-auto"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ViewWrapper>
  );
}
