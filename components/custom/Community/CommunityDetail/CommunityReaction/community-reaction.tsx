"use client";

import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, Bookmark, Share2, Flag } from "lucide-react";
import { useEffect, useState } from "react";
import { ShareDialog } from "../ShareDialog/share-dialog";
import { ReportDialog } from "../ReportDialog/report-dialog";
import {
  CommunityReactionTypes,
  CommunityReactionDataTypes,
} from "../../community.types";
import { useSession } from "next-auth/react";
import { requestPostData } from "@/lib/config/api";
import { COMMUNITY_ENDPOINTS } from "@/lib/config/endpoint";
import { useQuery } from "@tanstack/react-query";

export default function CommunityReaction({
  postInfo,
}: CommunityReactionTypes) {
  const { data: session, status } = useSession();
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);

  const fetchReactionData = async (
    email: string
  ): Promise<CommunityReactionDataTypes> => {
    const data = await requestPostData(
      `${COMMUNITY_ENDPOINTS.GET_DETAIL_POST_META_DATA}`,
      {
        url: `${postInfo.id}-${postInfo.slug}`,
        user_email: email,
      }
    );

    if (!data || data.status !== 200) {
      throw new Error(data?.msg || "Failed to fetch post reaction data");
    }

    return data.data;
  };

  const userEmail = session?.email ?? "";

  const handleLike = () => {
    if (liked) {
      setLiked(false);
    } else {
      setLiked(true);
      if (disliked) setDisliked(false);
    }
  };

  const handleDislike = () => {
    if (disliked) {
      setDisliked(false);
    } else {
      setDisliked(true);
      if (liked) setLiked(false);
    }
  };

  const handleBookMark = () => {
    if (bookmarked) {
      setBookmarked(false);
    } else {
      setBookmarked(true);
    }
  };

  const { data: reactionData } = useQuery({
    queryKey: ["communityDetailReaction", postInfo.id, userEmail],
    queryFn: () => fetchReactionData(userEmail),
    enabled: status !== "loading",
    retry: 1,
    staleTime: 0,
  });

  useEffect(() => {
    if (reactionData) {
      setLiked(reactionData.is_like === 1);
      setDisliked(reactionData.is_like === -1);
      setBookmarked(reactionData.is_bookmarked === 1);
      setLikeCount(reactionData.like_count);
    }
  }, [reactionData]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
      <div className="flex flex-wrap justify-center sm:flex sm:items-center sm:justify-between gap-2 sm:gap-4">
        {/* 좋아요 / 싫어요 그룹 */}
        <div className="flex w-full sm:w-auto justify-center gap-2">
          <Button
            variant="ghost"
            className={`flex items-center space-x-2 ${
              liked ? "text-orange-400" : "text-gray-600 dark:text-gray-300"
            } hover:bg-gray-100 dark:hover:bg-gray-700 w-1/2 sm:w-auto justify-center`}
            onClick={handleLike}
          >
            <ThumbsUp className="w-5 h-5" />
            <span>좋아요</span>
            <span className="text-sm">({likeCount})</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex items-center space-x-2 ${
              disliked ? "text-red-400" : "text-gray-600 dark:text-gray-300"
            } hover:bg-gray-100 dark:hover:bg-gray-700 w-1/2 sm:w-auto justify-center`}
            onClick={handleDislike}
          >
            <ThumbsDown className="w-5 h-5" />
            <span>싫어요</span>
          </Button>
        </div>

        {/* 북마크 / 공유 / 신고 그룹 */}
        <div className="flex w-full sm:w-auto justify-center gap-2 mt-2 sm:mt-0">
          <Button
            variant="ghost"
            className={`flex items-center space-x-2 ${
              bookmarked
                ? "text-orange-400"
                : "text-gray-600 dark:text-gray-300"
            } hover:bg-gray-100 dark:hover:bg-gray-700 w-1/3 sm:w-auto justify-center`}
            onClick={() => handleBookMark}
          >
            <Bookmark className="w-5 h-5" />
            <span>북마크</span>
          </Button>
          <Button
            variant="ghost"
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-700 w-1/3 sm:w-auto justify-center"
            onClick={() => setShareOpen(true)}
          >
            <Share2 className="w-5 h-5" />
            <span>공유</span>
          </Button>
          <Button
            variant="ghost"
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 w-1/3 sm:w-auto justify-center"
            onClick={() => setReportOpen(true)}
          >
            <Flag className="w-5 h-5" />
            <span>신고</span>
          </Button>
        </div>
      </div>{" "}
      <ShareDialog
        open={shareOpen}
        onOpenChange={setShareOpen}
        title="게시글 공유"
        url=""
      />
      <ReportDialog
        open={reportOpen}
        onOpenChange={setReportOpen}
        subject="post"
        subjectId={postInfo.id}
      />
    </div>
  );
}
