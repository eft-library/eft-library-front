"use client";

import PostEditor from "@/components/custom/PostEditor/post-editor";
import { useState } from "react";
import { COMMUNITY_ENDPOINTS } from "@/lib/config/endpoint";
import { requestUserData } from "@/lib/config/api";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, ReceiptText } from "lucide-react";
import DefaultDialog from "@/components/custom/DefaultDialog/default-dialog";
import { CATEGORY_LIST } from "@/lib/consts/community-consts";
import { useRouter } from "next/navigation";
import { CommunityWriteTypes } from "../community.types";
import { useAppStore } from "@/store/provider";
import { getBanStatus } from "@/lib/func/userFunction";

export default function CommunityWrite({
  postInfo,
  writeType,
  pageTitle,
}: CommunityWriteTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const router = useRouter();
  const { data: session } = useSession();
  const [contents, setContents] = useState(postInfo?.contents ?? "");
  const { setPageCategory } = useAppStore((state) => state);
  const [category, setCategory] = useState(
    CATEGORY_LIST.find((c) => c.id === postInfo?.category) ?? CATEGORY_LIST[1]
  );
  const [title, setTitle] = useState(postInfo?.title ?? "");
  const [alertDesc, setAlertDesc] = useState<string>("");
  const [alertStatus, setAlertStatus] = useState<boolean>(false);

  const handleSave = async () => {
    try {
      if (session && session.email) {
        if (title.length < 1) {
          setAlertDesc("제목을 입력해주세요.");
          requestAnimationFrame(() => {
            setAlertStatus(true);
          });
          return;
        }

        if (contents.length < 1) {
          setAlertDesc("내용을 입력해주세요.");
          requestAnimationFrame(() => {
            setAlertStatus(true);
          });
          return;
        }
        setPageCategory(category.id);
        if (writeType === "create") {
          const data = await requestUserData(
            COMMUNITY_ENDPOINTS.CREATE_POSTS,
            {
              title: title,
              category: category.id,
              contents: contents,
              nickname: session.userInfo.nickname ?? "",
            },
            session
          );
          if (data && data.status === 200) {
            router.push(`/community/detail/${data.data.url}`);
          } else {
            console.error(
              "Failed to fetch community create:",
              data?.msg || "Unknown error"
            );
          }
        } else {
          const data = await requestUserData(
            COMMUNITY_ENDPOINTS.UPDATE_POST,
            {
              id: postInfo?.id,
              slug: postInfo?.slug,
              title: title,
              category: category.id,
              contents: contents,
            },
            session
          );
          if (data && data.status === 200) {
            router.push(`/community/detail/${data.data.url}`);
          } else {
            console.error(
              "Failed to fetch community create:",
              data?.msg || "Unknown error"
            );
          }
        }
      } else {
        setAlertDesc("로그인 사용자만 저장 가능합니다.");
        requestAnimationFrame(() => {
          setAlertStatus(true);
        });
      }
    } catch (error) {
      console.error("Error fetching community create:", error);
    }
  };
  const banStatus = getBanStatus(
    session?.userInfo.start_time,
    session?.userInfo.end_time
  );

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold mb-8 text-gray-900">
        {pageTitle}
      </h1>
      <div className="flex items-center justify-center gap-4 mb-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="
          w-full 
          max-w-xs
          lg:w-[140px] 
          justify-between 
          h-9 
          px-4 
          py-2 
          bg-white 
          text-gray-700
          border border-gray-300
          rounded-md
          hover:bg-blue-50 
          hover:text-blue-600
          transition-colors
          flex items-center
        "
            >
              <div className="flex items-center truncate">
                <ReceiptText className="mr-2 h-5 w-5 opacity-70" />
                <span className="truncate font-semibold">{category.ko}</span>
              </div>

              <ChevronDown className="ml-2 h-5 w-5 shrink-0 opacity-60" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[220px] p-1 rounded-md border border-gray-200 shadow-md bg-white"
            align="start"
            sideOffset={4}
          >
            {CATEGORY_LIST.filter((cate) => cate.id !== "issue").map(
              (category_identify) => (
                <DropdownMenuItem
                  key={category_identify.id}
                  className="
            p-2 
            flex items-center 
            gap-2 
            rounded-md 
            hover:bg-blue-100 
            cursor-pointer
            transition-colors
          "
                  onSelect={() => setCategory(category_identify)}
                >
                  <ReceiptText className="h-5 w-5 opacity-70" />
                  <span className="truncate text-gray-800">
                    {category_identify[localeKey]}
                  </span>
                </DropdownMenuItem>
              )
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <Input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="rounded-md border border-gray-300 px-4 py-2 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
        />
      </div>
      <PostEditor onChange={setContents} initialContent={contents} />
      {banStatus === "none" && (
        <button
          onClick={handleSave}
          className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg"
        >
          저장
        </button>
      )}
      {banStatus === "permanent" && (
        <div className="flex-1 p-4 rounded-lg border border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900 text-red-700 dark:text-red-200 text-center">
          <p className="font-semibold">글 작성이 영구적으로 제한되었습니다.</p>
          <p className="text-sm mt-1">관리자에게 문의해주세요.</p>
        </div>
      )}

      {banStatus === "temporary" && (
        <div className="flex-1 p-4 rounded-lg border border-yellow-300 dark:border-yellow-600 bg-yellow-50 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200 text-center">
          <p className="font-semibold">
            현재 글 작성이 일시적으로 제한되었습니다.
          </p>
          <p className="text-sm mt-1">
            제재 해제 시간:{" "}
            <span className="font-mono">
              {new Date(session?.userInfo.end_time ?? "").toLocaleString()}
            </span>
          </p>
          <p className="text-xs mt-1">해제 후 다시 시도해주세요.</p>
        </div>
      )}

      <DefaultDialog
        open={alertStatus}
        setOpen={setAlertStatus}
        title="Notice"
        description={alertDesc}
      />
    </div>
  );
}
