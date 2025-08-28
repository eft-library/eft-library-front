"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
// import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { MessageCircle, Send } from "lucide-react";
import { ReportDialog } from "../ReportDialog/report-dialog";
// import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { requestPostData } from "@/lib/config/api";
import { COMMUNITY_ENDPOINTS } from "@/lib/config/endpoint";
import { useQuery } from "@tanstack/react-query";
import { CommentListsTypes, CommentSectionTypes } from "../../community.types";
import Loading from "@/components/custom/Loading/loading";
import Comment from "./comment";
import { useCommentReaction } from "@/lib/hooks/useCommentReaction";
import DefaultDialog from "@/components/custom/DefaultDialog/default-dialog";
import CustomPagination from "@/components/custom/CustomPagination/custom-pagination";
import { useSearchParams } from "next/navigation";
import IssueComment from "./issue-comment";

export default function CommentSection({ postInfo }: CommentSectionTypes) {
  const searchParams = useSearchParams();
  const pageNum = searchParams.get("page") || 0;
  const commentId = searchParams.get("comment_id") ?? "";

  const { data: session } = useSession();
  const { createParentComment } = useCommentReaction(
    postInfo.id,
    session?.accessToken || ""
  );
  const [newComment, setNewComment] = useState("");
  const [reportOpen, setReportOpen] = useState<{
    open: boolean;
    id: string;
    userEmail: string;
    reportType: string;
  }>({
    open: false,
    id: "",
    userEmail: "",
    reportType: "",
  });
  const [alertDesc, setAlertDesc] = useState<string>("");
  const [alertStatus, setAlertStatus] = useState<boolean>(false);

  const createParentCommentFunc = () => {
    if (session && session.email) {
      createParentComment.mutate({ contents: newComment });
      setNewComment("");
    } else {
      setAlertDesc("로그인 사용자만 저장 가능합니다.");
      requestAnimationFrame(() => {
        setAlertStatus(true);
      });
    }
  };

  const fetchCommentData = async (
    email: string,
    pageNum: number,
    commentId: string
  ): Promise<CommentListsTypes> => {
    const data = await requestPostData(`${COMMUNITY_ENDPOINTS.GET_COMMENTS}`, {
      post_id: postInfo.id,
      user_email: email,
      issue_comment_id: commentId,
      page_num: pageNum,
    });
    if (!data || data.status !== 200) {
      throw new Error(data?.msg || "Failed to fetch post reaction data");
    }
    return data.data;
  };

  const userEmail = session?.email ?? "";

  const { data: commentData, isLoading } = useQuery({
    queryKey: ["commentData", postInfo.id, userEmail, pageNum, commentId],
    queryFn: () => fetchCommentData(userEmail, Number(pageNum), commentId),
  });

  if (isLoading || !commentData) return <Loading />;

  return (
    <section className="space-y-6 ">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
            <MessageCircle className="w-5 h-5 mr-2" />
            댓글 ({commentData.total})
          </h2>
        </div>

        {/* Comment Search - Removed */}

        {/* Composer (logged-in) */}
        <div className="space-y-3 mb-8">
          <div className="flex items-start gap-3">
            {/* <Avatar className="w-10 h-10">
              <AvatarImage
                src={currentUser.avatar || "/placeholder.svg"}
                alt={currentUser.name}
              />
              <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
            </Avatar> */}
            <div className="flex-1">
              <Textarea
                placeholder="댓글을 작성해주세요."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-orange-400 min-h-[100px]"
              />
              <div className="flex items-center justify-between mt-2">
                <div className="flex gap-2">
                  <Button
                    onClick={createParentCommentFunc}
                    className="bg-orange-500 hover:bg-orange-600 text-white cursor-pointer"
                  >
                    <Send className="w-4 h-4 mr-1" /> 댓글 작성
                  </Button>
                  {newComment.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setNewComment("")}
                      className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white cursor-pointer"
                    >
                      취소
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* List */}
        <div className="space-y-6">
          {/* {commentData.issue_comments.map((issue) => (
            <div key={`issue-${issue.id}`} className="space-y-4">
              <div className="flex space-x-4">
                <Avatar className="w-10 h-10 flex-shrink-0">
                    <AvatarImage
                      src={comment.author.avatar || "/placeholder.svg"}
                      alt={comment.author.name}
                    />
                    <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
                  </Avatar>
              </div>
            </div>
          ))} */}
          <div className="space-y-2 mb-4">
            {commentData.issue_comments.map((comment) => (
              <IssueComment
                key={`issue-comment-${comment.id}`}
                comment={comment}
                postInfo={postInfo}
              />
            ))}
          </div>
          <div className="space-y-2 mb-4">
            {commentData.comments.map((comment) => (
              <Comment
                comment={comment}
                postInfo={postInfo}
                key={`comment-${comment.id}`}
                setReportOpen={setReportOpen}
              />
            ))}
          </div>
        </div>
        {commentData.total > 0 && (
          <CustomPagination
            total={commentData.max_page_count}
            routeLink={`/community/detail/${postInfo.id}-${postInfo.slug}?page=`}
            currentPage={commentData.current_page_num}
          />
        )}
      </div>

      <ReportDialog
        open={reportOpen.open}
        onOpenChange={(open) =>
          setReportOpen({ open, id: "", userEmail: "", reportType: "" })
        }
        subject={reportOpen.reportType ?? ""}
        subjectId={reportOpen.id ?? ""}
        targetEmail={reportOpen.userEmail ?? ""}
      />
      <DefaultDialog
        open={alertStatus}
        setOpen={setAlertStatus}
        title="Notice"
        description={alertDesc}
      />
    </section>
  );
}
