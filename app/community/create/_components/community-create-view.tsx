"use client";

import PostEditor from "@/components/custom/PostEditor/post-editor";
import { useState } from "react";
import { COMMUNITY_ENDPOINTS } from "@/lib/config/endpoint";
import { requestUserData } from "@/lib/config/api";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
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

export default function CommunityCreateView() {
  const router = useRouter();
  const { data: session } = useSession();
  const [contents, setContents] = useState("");
  const [category, setCategory] = useState({ id: "free", kr: "자유" });
  const [title, setTitle] = useState("");
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

        const data = await requestUserData(
          COMMUNITY_ENDPOINTS.CREATE_POSTS,
          {
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

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold mb-8 text-gray-900">새 글 작성</h1>
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
                <span className="truncate font-semibold">{category.kr}</span>
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
                    {category_identify.kr}
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
      <button
        onClick={handleSave}
        className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-lg"
      >
        저장
      </button>
      <DefaultDialog
        open={alertStatus}
        setOpen={setAlertStatus}
        title="Notice"
        description={alertDesc}
      />
    </div>
  );
}
