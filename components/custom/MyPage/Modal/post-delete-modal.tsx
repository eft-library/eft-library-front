"use client";

import { useMyPageReaction } from "@/lib/hooks/useMyPageReaction";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { DeletePostTypes } from "../my-page.types";

export default function PostDeleteModal({
  postInfo,
  setDeletePost,
}: DeletePostTypes) {
  const { data: session } = useSession();
  const { theme } = useTheme();
  const { deletePostByUser } = useMyPageReaction(session?.accessToken ?? "");

  const deletePost = () => {
    deletePostByUser.mutate({ postId: postInfo?.id ?? "" });
    setDeletePost({
      postInfo: null,
      deleteOpen: false,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        className={`p-6 rounded-lg max-w-md w-full mx-4 ${
          theme === "dark"
            ? "bg-[#2c2f33] border border-[#23272a]"
            : "bg-white border border-[#dcdfe3]"
        }`}
      >
        <h3
          className={`text-lg font-semibold mb-4 ${
            theme === "dark" ? "text-white" : "text-[#2c2f33]"
          }`}
        >
          게시글 삭제
        </h3>
        <p
          className={`mb-6 ${
            theme === "dark" ? "text-white" : "text-[#2c2f33]"
          }`}
        >
          {`'`}
          <span
            className={`font-medium ${
              theme === "dark" ? "text-[#f4a261]" : "text-[#e76f51]"
            }`}
          >
            {postInfo?.title ?? ""}
          </span>
          {`'`}을 삭제하시겠습니까?
        </p>
        <div className="flex space-x-3">
          <button
            onClick={() => deletePost()}
            className="flex-1 px-4 py-2 bg-[#5865f2] text-white rounded-md font-medium hover:bg-[#4752c4] transition-colors"
          >
            삭제
          </button>
          <button
            onClick={() => {
              setDeletePost({ postInfo: null, deleteOpen: false });
            }}
            className={`flex-1 px-4 py-2 rounded-md font-medium transition-colors ${
              theme === "dark"
                ? "bg-[#4f545c] text-white hover:bg-[#5d6269]"
                : "bg-[#f2f3f5] text-[#2c2f33] hover:bg-[#e3e5e8]"
            }`}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
