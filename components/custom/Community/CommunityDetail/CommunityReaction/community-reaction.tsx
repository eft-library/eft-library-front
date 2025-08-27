"use client";

import { Button } from "@/components/ui/button";
import { ThumbsUp, ThumbsDown, Bookmark, Share2, Flag } from "lucide-react";
import { useState } from "react";
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
import Loading from "@/components/custom/Loading/loading";
import { usePostMetaData } from "@/lib/hooks/usePostReaction";
import DefaultDialog from "@/components/custom/DefaultDialog/default-dialog";

export default function CommunityReaction({
  postInfo,
}: CommunityReactionTypes) {
  const { data: session } = useSession();
  const { likeMutation, dislikeMutation, bookmarkMutation } = usePostMetaData(
    postInfo.id,
    session?.accessToken || ""
  );
  const [shareOpen, setShareOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [alertDesc, setAlertDesc] = useState<string>("");
  const [alertStatus, setAlertStatus] = useState<boolean>(false);

  const fetchReactionData = async (
    email: string
  ): Promise<CommunityReactionDataTypes> => {
    const data = await requestPostData(
      `${COMMUNITY_ENDPOINTS.GET_DETAIL_POST_META_DATA}`,
      {
        url: `${postInfo.id}-${postInfo.slug}`,
        user_email: email,
        page_category: "all",
      }
    );

    if (!data || data.status !== 200) {
      throw new Error(data?.msg || "Failed to fetch post reaction data");
    }
    return data.data;
  };

  const userEmail = session?.email ?? "";

  const { data: reactionData, isLoading } = useQuery({
    queryKey: ["postMetaData", postInfo.id, userEmail],
    queryFn: () => fetchReactionData(userEmail),
  });

  const onClickReaction = (actionType: string) => {
    if (session && session.email) {
      switch (actionType) {
        case "like":
          likeMutation.mutate();
          break;
        case "dislike":
          dislikeMutation.mutate();
          break;
        case "bookmark":
          bookmarkMutation.mutate();
          break;
        case "report":
          setReportOpen(true);
        default:
          // 필요 시 처리
          break;
      }
    } else {
      setAlertDesc("로그인 사용자만 저장 가능합니다.");
      requestAnimationFrame(() => {
        setAlertStatus(true);
      });
    }
  };

  if (isLoading || !reactionData) return <Loading />;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
      <div className="flex flex-wrap justify-center sm:flex sm:items-center sm:justify-between gap-2 sm:gap-4">
        {/* 좋아요 / 싫어요 그룹 */}
        <div className="flex w-full sm:w-auto justify-center gap-2">
          <Button
            variant="ghost"
            className={`flex cursor-pointer items-center space-x-2 ${
              session && reactionData.is_like === 1
                ? "text-orange-400"
                : "text-gray-600 dark:text-gray-300"
            } hover:bg-gray-100 dark:hover:bg-gray-700 w-1/2 sm:w-auto justify-center`}
            onClick={() => onClickReaction("like")}
          >
            <ThumbsUp className="w-5 h-5" />
            <span>좋아요</span>
            <span className="text-sm">({reactionData.like_count ?? 0})</span>
          </Button>
          <Button
            variant="ghost"
            className={`flex cursor-pointer items-center space-x-2 ${
              session && reactionData.is_like === 0
                ? "text-red-400"
                : "text-gray-600 dark:text-gray-300"
            } hover:bg-gray-100 dark:hover:bg-gray-700 w-1/2 sm:w-auto justify-center`}
            onClick={() => onClickReaction("dislike")}
          >
            <ThumbsDown className="w-5 h-5" />
            <span>싫어요</span>
          </Button>
        </div>

        {/* 북마크 / 공유 / 신고 그룹 */}
        <div className="flex w-full sm:w-auto justify-center gap-2 mt-2 sm:mt-0">
          <Button
            variant="ghost"
            className={`flex cursor-pointer items-center space-x-2 ${
              session && reactionData.is_bookmarked
                ? "text-orange-400"
                : "text-gray-600 dark:text-gray-300"
            } hover:bg-gray-100 dark:hover:bg-gray-700 w-1/3 sm:w-auto justify-center`}
            onClick={() => onClickReaction("bookmark")}
          >
            <Bookmark className="w-5 h-5" />
            <span>북마크</span>
          </Button>
          <Button
            variant="ghost"
            className="flex cursor-pointer items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-700 w-1/3 sm:w-auto justify-center"
            onClick={() => setShareOpen(true)}
          >
            <Share2 className="w-5 h-5" />
            <span>공유</span>
          </Button>
          <Button
            variant="ghost"
            className="flex cursor-pointer items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 w-1/3 sm:w-auto justify-center"
            onClick={() => onClickReaction("report")}
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
        url={`https://eftlibrary.com/community/detail/${postInfo.id}-${postInfo.slug}`}
      />
      <ReportDialog
        open={reportOpen}
        onOpenChange={setReportOpen}
        subject="post"
        subjectId={postInfo.id}
        targetEmail={postInfo.user_email}
      />
      <DefaultDialog
        open={alertStatus}
        setOpen={setAlertStatus}
        title="Notice"
        description={alertDesc}
      />
    </div>
  );
}
