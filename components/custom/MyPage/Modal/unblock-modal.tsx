"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { UnBlockTypes } from "../my-page.types";

export default function UnBlockModal({
  setDeleteBlock,
  blockInfo,
}: UnBlockTypes) {
  const { data: session } = useSession();
  const { theme } = useTheme();

  // mutation으로
  const deleteBlock = async () => {};

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div
        className={`w-full max-w-md rounded-lg shadow-lg ${
          theme === "dark"
            ? "bg-[#2c2f33] border border-[#23272a]"
            : "bg-white border border-[#dcdfe3]"
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3
              className={`text-lg font-semibold ${
                theme === "dark" ? "text-white" : "text-[#2c2f33]"
              }`}
            >
              차단 해제 확인
            </h3>
            <button
              onClick={() => {
                setDeleteBlock({ blocked_email: "", deleteOpen: false });
              }}
              className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                theme === "dark"
                  ? "text-gray-400 hover:text-white hover:bg-gray-700"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div
            className={`mb-6 ${
              theme === "dark" ? "text-white" : "text-[#2c2f33]"
            }`}
          >
            <p className="mb-2">
              <span
                className={`font-medium ${
                  theme === "dark" ? "text-[#ff6b6b]" : "text-[#e03131]"
                }`}
              >
                {blockInfo.nickname}
              </span>{" "}
              사용자의 차단을 해제하시겠습니까?
            </p>
            <p className="text-sm">차단 사유: {blockInfo.reason}</p>
          </div>

          <div className="flex space-x-3">
            <Button
              onClick={() => deleteBlock()}
              className="flex-1 bg-[#5865f2] hover:bg-[#4752c4] text-white"
            >
              차단 해제
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setDeleteBlock({ blocked_email: "", deleteOpen: false });
              }}
              className={`flex-1 border-0 ${
                theme === "dark"
                  ? "bg-[#4f545c] text-[#dcddde] hover:bg-[#5d6269]"
                  : "bg-[#f2f3f5] text-[#4f545c] hover:bg-[#e3e5e8]"
              }`}
            >
              취소
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
