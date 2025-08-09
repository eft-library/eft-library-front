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

export default function CommunityCreateView() {
  const { data: session } = useSession();
  const [contents, setContents] = useState("");
  const [category, setCategory] = useState({ id: "free", kr: "자유" });
  const [title, setTitle] = useState("");
  const [alertDesc, setAlertDesc] = useState<string>("");
  const [alertStatus, setAlertStatus] = useState<boolean>(false);

  // 제목, 내용 없는 경우 경고 문구

  const CATEGORY_LIST = [
    { id: "free", kr: "자유" },
    { id: "info", kr: "정보" },
    { id: "humor", kr: "유머" },
    { id: "pvp", kr: "pvp" },
    { id: "pve", kr: "PVE" },
    { id: "question", kr: "질문" },
  ];

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
          console.log("성공");
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
    <div className="max-w-7xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">새 글 작성</h1>
      <Input
        type="text"
        placeholder={"제목"}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-full lg:w-[220px] justify-between h-11 px-4 py-2 bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <div className="flex items-center">
              <ReceiptText className="mr-2 h-4 w-4 opacity-60" />
              <span className="truncate font-semibold">{category.kr}</span>
            </div>

            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-[220px] p-1"
          align="start"
          sideOffset={4}
        >
          {CATEGORY_LIST.map((category_identify) => (
            <DropdownMenuItem
              key={category_identify.id}
              className="p-0"
              onSelect={() => setCategory(category_identify)}
            >
              <ReceiptText className="mr-2 h-4 w-4 opacity-60" />
              <span className="truncate">{category_identify.kr}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
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
