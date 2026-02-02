"use client";

import { Button } from "@/components/ui/button";
import { requestGetUserData } from "@/lib/config/api";
import { USER_API_ENDPOINTS } from "@/lib/config/endpoint";
import { X } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { WithdrawModalTypes } from "../my-page.types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

export default function WithdrawModal({
  setShowWithdrawModal,
}: WithdrawModalTypes) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();
  const router = useRouter();

  const withdrawUser = async () => {
    if (session && session.email) {
      const data = await requestGetUserData(
        USER_API_ENDPOINTS.DELETE_USER,
        session,
      );

      if (data && data.status === 200 && data.data) {
        setIsOpen(true);
      } else {
        console.error(
          "Failed to fetch station data:",
          data?.msg || "Unknown error",
        );
        alert("Error가 발생했습니다. 관리자에게 문의해주세요");
        setShowWithdrawModal(false);
      }
    }
  };

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
              회원 탈퇴 확인
            </h3>
            <button
              onClick={() => setShowWithdrawModal(false)}
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
            <p className="mb-4 leading-relaxed">
              탈퇴 시 계정 및 모든 데이터는 영구적으로 삭제되며 복구할 수
              없습니다.
              <br />
              이후 언제든지 다시 가입하여 서비스를 이용하실 수 있습니다.
            </p>
            <p
              className={`text-sm ${
                theme === "dark" ? "text-red-400" : "text-red-600"
              } font-medium`}
            >
              계정과 데이터는 영구 삭제되며 복구가 불가능합니다.
            </p>
          </div>

          <div className="flex space-x-3">
            <Button
              onClick={() => {
                withdrawUser();
              }}
              className="flex-1 bg-[#e03131] hover:bg-[#c92a2a] text-white"
            >
              탈퇴
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowWithdrawModal(false)}
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

      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
        }}
      >
        <DialogContent className="bg-white dark:bg-[#2a2d35] border-gray-200 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white flex items-center gap-2">
              탈퇴가 완료되었습니다.
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              그동안 이용해 주셔서 감사합니다!
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button
              onClick={async () => {
                setIsOpen(false);
                setShowWithdrawModal(false);
                await signOut({ redirect: false });
                router.push("/");
              }}
              className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white"
            >
              종료
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
