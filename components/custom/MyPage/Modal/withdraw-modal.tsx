"use client";

import { Button } from "@/components/ui/button";
import { requestGetUserData } from "@/lib/config/api";
import { USER_API_ENDPOINTS } from "@/lib/config/endpoint";
import { X } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { WithdrawModalTypes } from "../my-page.types";

export default function WithdrawModal({
  setShowWithdrawModal,
}: WithdrawModalTypes) {
  const { data: session } = useSession();
  const { theme } = useTheme();
  const router = useRouter();

  const withdrawUser = async () => {
    if (session && session.email) {
      const data = await requestGetUserData(
        USER_API_ENDPOINTS.DELETE_USER,
        session,
      );

      if (data && data.status === 200 && data.data) {
        setShowWithdrawModal(false);
        signOut();
        router.push("/");
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
              탈퇴를 하시면{" "}
              <span
                className={`font-medium ${
                  theme === "dark" ? "text-[#ff6b6b]" : "text-[#e03131]"
                }`}
              >
                30일간 유예기간
              </span>
              이 적용됩니다. 이 기간 동안 마음이 바뀌면 다시 로그인하여 탈퇴를
              철회할 수 있습니다.
            </p>
            <p
              className={`text-sm ${
                theme === "dark" ? "text-red-400" : "text-red-600"
              } font-medium`}
            >
              30일이 지나면 계정과 데이터는 영구 삭제되며 복구가 불가능합니다.
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
    </div>
  );
}
