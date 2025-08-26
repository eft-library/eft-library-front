"use client";

import { useState, useEffect } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { requestUserData } from "@/lib/config/api";
import { USER_API_ENDPOINTS } from "@/lib/config/endpoint";
import { useSession } from "next-auth/react";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { nicknameI18N } from "@/lib/consts/i18nConsts";

export default function OnboardingView() {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const { data: session, update: updateSession } = useSession();
  const [nickname, setNickname] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [showDuplicateDialog, setShowDuplicateDialog] = useState(false);
  const [duplicateCheckResult, setDuplicateCheckResult] = useState<
    "available" | "duplicate" | null
  >(null);

  useEffect(() => {
    const validateNickname = () => {
      const newErrors: string[] = [];

      if (nickname.length < 2) {
        newErrors.push("닉네임은 최소 2글자 이상이어야 합니다.");
      } else if (nickname.length > 12) {
        newErrors.push("닉네임은 최대 12글자까지 가능합니다.");
      }

      const allowedPattern = /^[가-힣a-zA-Z0-9_-]+$/;
      if (nickname && !allowedPattern.test(nickname)) {
        newErrors.push("한글, 영문, 숫자, _, - 만 사용 가능합니다.");
      }

      if (nickname.includes(" ")) {
        newErrors.push("띄어쓰기는 사용할 수 없습니다.");
      }

      const forbiddenWords = [
        "관리자",
        "운영자",
        "admin",
        "moderator",
        "시발",
        "개새끼",
      ];
      const hasForbiddenWord = forbiddenWords.some((word) =>
        nickname.toLowerCase().includes(word.toLowerCase())
      );
      if (hasForbiddenWord) {
        newErrors.push("사용할 수 없는 단어가 포함되어 있습니다.");
      }

      setErrors(newErrors);
      setIsValid(
        nickname.length >= 2 && nickname.length <= 12 && newErrors.length === 0
      );
    };

    validateNickname();
    setDuplicateCheckResult(null);
  }, [nickname]);

  const checkDuplicate = async () => {
    if (!isValid) return;

    setIsChecking(true);

    const data = await requestUserData(
      USER_API_ENDPOINTS.CHECK_NICKNAME_DUPLICATE,
      {
        nickname: nickname,
      },
      session
    );
    if (data && data.status === 200 && data.data) {
      if (data.data.result === 0) {
        setDuplicateCheckResult("available");
      } else {
        setDuplicateCheckResult("duplicate");
      }
    } else {
      console.error(
        "Failed to fetch station data:",
        data?.msg || "Unknown error"
      );
      setDuplicateCheckResult("duplicate");
    }
    setIsChecking(false);
  };

  const handleSubmit = async () => {
    if (!isValid || duplicateCheckResult !== "available") return;
    const data = await requestUserData(
      USER_API_ENDPOINTS.UPDATE_NICKNAME,
      {
        nickname: nickname,
      },
      session
    );
    if (data && data.status === 200 && data.data) {
      setResultMessage(data.data[localeKey]);
      setShowDuplicateDialog(true);
      await updateSession({
        ...session,
        userInfo: {
          ...session?.userInfo,
          nickname: nickname,
        },
      });
    } else {
      console.error(
        "Failed to fetch station data:",
        data?.msg || "Unknown error"
      );
      setResultMessage("Error");
      setShowDuplicateDialog(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#1e2124] flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white dark:bg-[#2a2d35] border-gray-200 dark:border-gray-700">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
            {nicknameI18N.cardTitle[localeKey]}
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            {nicknameI18N.cardDescription[localeKey]}
            <p className="text-green-500">
              {nicknameI18N.cardSubDescription[localeKey]}
            </p>
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {nicknameI18N.labelNickname[localeKey]}
            </label>
            <div className="relative">
              <Input
                type="text"
                placeholder={nicknameI18N.placeholderNickname[localeKey]}
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
                className="cursor-pointer border-orange-500 text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950 disabled:border-gray-300 dark:disabled:border-gray-600 disabled:text-gray-400 bg-transparent text-xs px-3 py-1 h-7"
              >
                {isChecking
                  ? nicknameI18N.checking[localeKey]
                  : nicknameI18N.buttonCheckDuplicate[localeKey]}
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
              {nicknameI18N.duplicateError[localeKey]}
            </div>
          )}

          {duplicateCheckResult === "available" && (
            <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
              <CheckCircle className="h-3 w-3" />
              {nicknameI18N.available[localeKey]}
            </div>
          )}

          <div className="bg-gray-100 dark:bg-gray-800/30 rounded-lg p-4 space-y-3">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-orange-500 dark:text-orange-400" />
              {nicknameI18N.submitButton[localeKey]}
            </h4>
            <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
              <div className="flex flex-wrap gap-1">
                <Badge
                  variant="outline"
                  className="text-xs border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400"
                >
                  {nicknameI18N.guidanceBadges.length[localeKey]}
                </Badge>
                <Badge
                  variant="outline"
                  className="text-xs border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400"
                >
                  {nicknameI18N.guidanceBadges.allowedChars[localeKey]}
                </Badge>
              </div>
              <ul className="space-y-1 list-disc list-inside">
                <li>{nicknameI18N.guidanceRules.noSpacesSpecial[localeKey]}</li>
                <li>{nicknameI18N.guidanceRules.noProfanity[localeKey]}</li>
                <li>
                  {nicknameI18N.guidanceRules.noAdminConfusion[localeKey]}
                </li>
                <li>{nicknameI18N.guidanceRules.uniqueNickname[localeKey]}</li>
                <li>{nicknameI18N.guidanceRules.changeLimit[localeKey]}</li>
              </ul>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleSubmit}
              disabled={!isValid || duplicateCheckResult !== "available"}
              className="cursor-pointer w-full bg-orange-500 hover:bg-orange-600 text-white disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:text-gray-500 dark:disabled:text-gray-400"
            >
              {nicknameI18N.submitButton[localeKey]}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={showDuplicateDialog}
        onOpenChange={(open) => {
          setShowDuplicateDialog(open);
          window.location.reload();
        }}
      >
        <DialogContent className="bg-white dark:bg-[#2a2d35] border-gray-200 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-gray-900 dark:text-white flex items-center gap-2">
              {nicknameI18N.dialogTitle[localeKey]}
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              {resultMessage}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button
              onClick={() => {
                setShowDuplicateDialog(false);
                window.location.reload();
              }}
              className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white"
            >
              {nicknameI18N.buttonConfirm[localeKey]}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
