import NewsView from "./News/news-view";
import GridItem from "./GridItem/grid-item";
import type { MainViewTypes } from "./news-view.types";
import PinnedNotice from "./PinnedNotice/pinned-notice";
import ViewWrapper from "@/components/custom/ViewWrapper/view-wrapper";
import AdBanner from "@/components/custom/Adsense/ad-banner";
import Link from "next/link";
import Image from "next/image";
import { Flame } from "lucide-react";

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
              {/* Pinned Notices */}
              <PinnedNotice notice={homeData.news} />

              {/* Trending Posts */}
              {homeData.home_posts.length > 3 && (
                <div className="rounded-lg p-6 border bg-white border-gray-200 shadow-sm dark:bg-gray-800/30 dark:border-gray-700/50">
                  <div className="flex items-center space-x-2 mb-4">
                    <Flame className="w-5 h-5 mr-2 text-orange-400" />
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                      최근 게시물
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {homeData.home_posts.map((post, index) => (
                      <Link
                        key={post.id}
                        scroll={false}
                        href={`/community/detail/${post.id}-${post.slug}`}
                      >
                        <div className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer">
                          <span className="text-xs font-bold text-orange-400 mt-1">
                            {index + 1}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-2 mb-1">
                              {post.title}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
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
