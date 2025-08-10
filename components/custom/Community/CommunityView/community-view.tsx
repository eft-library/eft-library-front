"use client";

import type { CommunityViewTypes } from "../community.types";
import CategoryTab from "../CategoryTab/category-tab";

export default function CommunityView({
  postInfo,
  category,
}: CommunityViewTypes) {
  return (
    <div className="min-h-screen bg-gray-900 light:bg-gray-50 text-gray-100 light:text-gray-900">
      <div className="container mx-auto px-4 py-6">
        <CategoryTab currentCategory={category} />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
          <div className="lg:col-span-3">{/* <PostGrid /> */}</div>
          <div className="lg:col-span-1">{/* <Sidebar /> */}</div>
        </div>
      </div>
    </div>
  );
}
