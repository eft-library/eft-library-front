"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSession } from "next-auth/react";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { requestUserData } from "@/lib/config/api";
import { USER_API_ENDPOINTS } from "@/lib/config/endpoint";
import { useRouter } from "next/navigation";
import {
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function OnboardingView() {
  const router = useRouter();
  const { data: session } = useSession();
  const [nickname, setNickname] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [duplicateCheckResult, setDuplicateCheckResult] = useState<number>(0);

  // 중복 검사
  const checkDuplicate = async () => {
    const data = await requestUserData(
      USER_API_ENDPOINTS.UPDATE_NICKNAME,
      {},
      session
    );
    if (data && data.status === 200 && data.data) {
      setIsDuplicate(data.data);
    } else {
      console.error(
        "Failed to fetch station data:",
        data?.msg || "Unknown error"
      );
      router.push("/");
    }
  };

  const handleSubmit = async () => {
    const data = await requestUserData(
      USER_API_ENDPOINTS.UPDATE_NICKNAME,
      {},
      session
    );
    if (data && data.status === 200 && data.data) {
      setPostInfo(data.data);
    } else {
      console.error(
        "Failed to fetch station data:",
        data?.msg || "Unknown error"
      );
      router.push("/");
    }
  };

  const validateNickname = (nickname: string) => {
    const forbiddenWords = [
      "욕설1",
      "욕설2",
      "admin",
      "운영진",
      "관리자",
      "운영자",
      "시발",
      "개새끼",
    ];
    // 1. 길이 체크
    if (nickname.length < 2 || nickname.length > 12) {
      return { valid: false, message: "닉네임은 2~12자 사이여야 합니다." };
    }

    // 2. 허용 문자 체크 (한글, 영문, 숫자, _, -)
    const regex = /^[가-힣a-zA-Z0-9_-]+$/;
    if (!regex.test(nickname)) {
      return {
        valid: false,
        message: "닉네임에는 한글, 영문, 숫자, _, -만 사용할 수 있습니다.",
      };
    }

    // 3. 금지 단어 체크
    const lowerNick = nickname.toLowerCase();
    if (forbiddenWords.some((word) => lowerNick.includes(word.toLowerCase()))) {
      return {
        valid: false,
        message: "사용할 수 없는 단어가 포함되어 있습니다.",
      };
    }

    return { valid: true };
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#1e2124] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white dark:bg-[#2a2d35] border-gray-200 dark:border-gray-700">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
            닉네임 설정
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            타르코프 도서관에서 사용할 닉네임을 입력해주세요
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              닉네임
            </label>
            <div className="relative">
              <Input
                type="text"
                placeholder="닉네임을 입력하세요"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="bg-gray-50 dark:bg-gray-800/50 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:border-orange-400 dark:focus:border-orange-400"
                maxLength={12}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                {nickname &&
                  (isValid && duplicateCheckResult === "available" ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-500 dark:text-gray-500">
                {nickname.length}/12
              </div>
              <Button
                onClick={checkDuplicate}
                disabled={!isValid || isChecking}
                variant="outline"
                size="sm"
                className="border-orange-500 text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950 disabled:border-gray-300 dark:disabled:border-gray-600 disabled:text-gray-400 bg-transparent text-xs px-3 py-1 h-7"
              >
                {isChecking ? "확인 중..." : "중복 확인"}
              </Button>
            </div>
          </div>

          {errors.length > 0 && (
            <div className="space-y-1">
              {errors.map((error, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400"
                >
                  <AlertCircle className="h-3 w-3" />
                  {error}
                </div>
              ))}
            </div>
          )}

          {duplicateCheckResult === "duplicate" && (
            <div className="flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
              <XCircle className="h-3 w-3" />
              이미 사용 중인 닉네임입니다.
            </div>
          )}

          {duplicateCheckResult === "available" && (
            <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
              <CheckCircle className="h-3 w-3" />
              사용 가능한 닉네임입니다.
            </div>
          )}

          <div className="bg-gray-100 dark:bg-gray-800/30 rounded-lg p-4 space-y-3">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-orange-500 dark:text-orange-400" />
              닉네임 작성 안내
            </h4>
            <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
              <div className="flex flex-wrap gap-1">
                <Badge
                  variant="outline"
                  className="text-xs border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400"
                >
                  2~12글자
                </Badge>
                <Badge
                  variant="outline"
                  className="text-xs border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400"
                >
                  한글, 영문, 숫자, _, -
                </Badge>
              </div>
              <ul className="space-y-1 list-disc list-inside">
                <li>띄어쓰기 및 특수문자는 사용할 수 없습니다</li>
                <li>욕설, 비속어, 특정인 사칭 표현은 금지됩니다</li>
                <li>운영진/관리자 혼동 표현은 금지됩니다</li>
                <li>동일 닉네임은 사용할 수 없습니다</li>
                <li>닉네임 변경은 30일에 1회만 가능합니다</li>
              </ul>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleSubmit}
              disabled={!isValid || duplicateCheckResult !== "available"}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:text-gray-500 dark:disabled:text-gray-400"
            >
              닉네임 설정 완료
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-white dark:bg-[#2a2d35] border-gray-200 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white flex items-center gap-2">
              {duplicateCheckResult === "available" ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  사용 가능한 닉네임
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5 text-red-500" />
                  사용 불가능한 닉네임
                </>
              )}
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              {duplicateCheckResult === "available"
                ? `"${nickname}" 닉네임을 사용하실 수 있습니다.`
                : `"${nickname}" 닉네임은 이미 사용 중입니다. 다른 닉네임을 선택해주세요.`}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button
              onClick={() => setShowDialog(false)}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              확인
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
