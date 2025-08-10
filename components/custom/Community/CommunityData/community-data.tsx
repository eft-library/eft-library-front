"use client";

import { requestData } from "@/lib/config/api";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { COMMUNITY_ENDPOINTS } from "@/lib/config/endpoint";
import Loading from "../../Loading/loading";
import type {
  CommunityDataTypes,
  CommunityPostsResponse,
} from "../community.types";
import CommunityView from "../CommunityView/community-view";

export default function CommunityData({ category }: CommunityDataTypes) {
  const searchParams = useSearchParams();
  const pageNum = searchParams.get("page");

  const [postInfo, setPostInfo] = useState<CommunityPostsResponse>();

  useEffect(() => {
    const getCommunity = async () => {
      const data = await requestData(
        `${COMMUNITY_ENDPOINTS.GET_POSTS}/${category}?page_num=${
          pageNum ? pageNum : 1
        }`
      );
      if (!data || data.status !== 200) {
        console.error(
          "Failed to fetch posts data:",
          data?.msg || "Unknown error"
        );
        return null;
      }
      setPostInfo(data.data);
    };
    getCommunity();
  }, [category]);

  if (!postInfo) return <Loading />;

  return <CommunityView postInfo={postInfo} />;
}
