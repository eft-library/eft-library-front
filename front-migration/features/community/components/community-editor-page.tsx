"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

import {
  createCommunityPost,
  getCommunityUpdatePost,
  updateCommunityPost,
  uploadCommunityImage,
} from "@/features/community/api";
import { communityCategories } from "@/lib/constants/community-categories";
import { getPostIdFromUrlParam } from "@/features/community/utils";

interface CommunityEditorPageProps {
  postParam?: string;
}

export function CommunityEditorPage({ postParam }: CommunityEditorPageProps) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("free");
  const [contents, setContents] = useState("");
  const [slug, setSlug] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const isUpdate = Boolean(postParam);
  const postId = useMemo(() => (postParam ? getPostIdFromUrlParam(postParam) : ""), [postParam]);

  useEffect(() => {
    if (!isUpdate || !session?.accessToken || !postId) {
      return;
    }

    getCommunityUpdatePost(postId, session.accessToken)
      .then((post) => {
        setTitle(post.title);
        setCategory(post.category);
        setContents(post.contents);
        setSlug(post.slug);
      })
      .catch(() => setError("수정할 게시글을 불러오지 못했습니다."));
  }, [isUpdate, postId, session?.accessToken]);

  async function submitPost(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!session?.accessToken) {
      await signIn("google");
      return;
    }

    const nickname = session.userInfo?.nickname ?? session.user?.name ?? "User";
    if (!title.trim() || !contents.trim()) {
      setError("제목과 내용을 입력해 주세요.");
      return;
    }

    setIsSaving(true);
    setError(null);
    try {
      const result = isUpdate
        ? await updateCommunityPost(
            {
              id: postId,
              slug,
              title: title.trim(),
              category,
              contents,
            },
            session.accessToken,
          )
        : await createCommunityPost(
            {
              title: title.trim(),
              category,
              contents,
              nickname,
            },
            session.accessToken,
          );
      router.push(`/community/detail/${result.url}`);
    } catch {
      setError("게시글 저장에 실패했습니다.");
    } finally {
      setIsSaving(false);
    }
  }

  async function uploadImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setIsUploading(true);
    setError(null);
    try {
      const imageUrl = await uploadCommunityImage(file);
      setContents((current) => `${current}\n<img src="${imageUrl}" />\n`);
    } catch {
      setError("이미지 업로드에 실패했습니다.");
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  }

  return (
    <main className="bg-gray-50 py-8 text-gray-950 dark:bg-[#1f232b] dark:text-gray-50">
      <form onSubmit={submitPost} className="mx-auto w-full max-w-4xl space-y-4 px-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-sm font-semibold text-orange-600 dark:text-orange-300">Community</p>
          <h1 className="mt-1 text-2xl font-black">{isUpdate ? "게시글 수정" : "글쓰기"}</h1>
        </div>

        {status !== "loading" && status !== "authenticated" ? (
          <div className="rounded-lg border border-orange-200 bg-orange-50 p-4 text-sm font-semibold text-orange-800 dark:border-orange-500/30 dark:bg-orange-500/10 dark:text-orange-200">
            로그인 후 글을 작성할 수 있습니다.
          </div>
        ) : null}

        <section className="space-y-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700/70 dark:bg-[#252932]">
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="h-10 w-full rounded-md border border-gray-200 bg-white px-3 text-sm font-semibold outline-none dark:border-gray-700 dark:bg-[#1f232b]"
          >
            {communityCategories
              .filter((item) => item.id !== "issue")
              .map((item) => (
                <option key={item.id} value={item.id}>
                  {item.labels.ko}
                </option>
              ))}
          </select>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="h-11 w-full rounded-md border border-gray-200 bg-gray-50 px-3 text-sm font-semibold outline-none focus:border-orange-300 dark:border-gray-700 dark:bg-[#1f232b]"
            placeholder="제목"
          />
          <textarea
            value={contents}
            onChange={(event) => setContents(event.target.value)}
            rows={16}
            className="w-full rounded-md border border-gray-200 bg-gray-50 p-3 text-sm leading-7 outline-none focus:border-orange-300 dark:border-gray-700 dark:bg-[#1f232b]"
            placeholder="내용을 입력해 주세요. 이미지 HTML도 그대로 저장할 수 있습니다."
          />
          <label className="flex cursor-pointer items-center justify-between gap-3 rounded-md border border-dashed border-gray-300 bg-gray-50 px-3 py-3 text-sm font-semibold text-gray-600 transition hover:border-orange-300 hover:text-orange-600 dark:border-gray-700 dark:bg-[#1f232b] dark:text-gray-300 dark:hover:border-orange-500 dark:hover:text-orange-300">
            <span>{isUploading ? "이미지 업로드 중" : "이미지 첨부"}</span>
            <input
              type="file"
              accept="image/*"
              onChange={uploadImage}
              disabled={isUploading}
              className="sr-only"
            />
          </label>
          {error ? <p className="text-sm font-semibold text-red-500">{error}</p> : null}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => router.back()}
              className="h-10 rounded-md border border-gray-200 px-4 text-sm font-bold text-gray-700 dark:border-gray-700 dark:text-gray-200"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={isSaving || status === "loading"}
              className="h-10 rounded-md bg-orange-500 px-5 text-sm font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSaving ? "저장 중" : "저장"}
            </button>
          </div>
        </section>
      </form>
    </main>
  );
}
