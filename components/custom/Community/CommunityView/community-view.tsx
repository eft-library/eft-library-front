"use client";

import type { CommunityViewTypes } from "../community.types";
import CategoryTab from "../CategoryTab/category-tab";
import PostGrid from "../PostGrid/post-grid";
import SidebarSearch from "../SideBarSearch/side-bar-search";
import CommunitySideBar from "../CommunitySideBar/community-side-bar";
import CommunitySearch from "../CommunitySearch/community-search";

export default function CommunityView({
  postInfo,
  category,
}: CommunityViewTypes) {
  console.log(postInfo);
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          PMC 라운지
        </h1>
        <CategoryTab currentCategory={category} />
        <div className="md:hidden mt-6">
          <SidebarSearch />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
          <div className="lg:col-span-3">
            <PostGrid postInfo={postInfo} category={category} />
            <CommunitySearch />
          </div>
          <div className="lg:col-span-1">
            <CommunitySideBar
              issue_posts={postInfo.issue_posts}
              notice_posts={postInfo.notice_posts}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
