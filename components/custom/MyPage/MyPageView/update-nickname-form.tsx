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
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { requestUserData } from "@/lib/config/api";
import { USER_API_ENDPOINTS } from "@/lib/config/endpoint";
import { useSession } from "next-auth/react";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { nicknameI18N } from "@/lib/consts/i18nConsts";
import { UpdateNicknameFormProps } from "../my-page.types";

export default function UpdateNicknameForm({
  onSuccess,
}: UpdateNicknameFormProps) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const { data: session, update: updateSession } = useSession();

  const [nickname, setNickname] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [duplicateCheckResult, setDuplicateCheckResult] = useState<
    "available" | "duplicate" | null
  >(null);

  useEffect(() => {
    const validateNickname = () => {
      const newErrors: string[] = [];

      if (nickname.length < 2)
        newErrors.push("닉네임은 최소 2글자 이상이어야 합니다.");
      else if (nickname.length > 12)
        newErrors.push("닉네임은 최대 12글자까지 가능합니다.");

      const allowedPattern = /^[가-힣a-zA-Z0-9_-]+$/;
      if (nickname && !allowedPattern.test(nickname)) {
        newErrors.push("한글, 영문, 숫자, _, - 만 사용 가능합니다.");
      }
      if (nickname.includes(" "))
        newErrors.push("띄어쓰기는 사용할 수 없습니다.");

      const forbiddenWords = [
        "관리자",
        "운영자",
        "admin",
        "moderator",
        "시발",
        "개새끼",
      ];
      if (
        forbiddenWords.some((w) =>
          nickname.toLowerCase().includes(w.toLowerCase())
        )
      ) {
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
      { nickname },
      session
    );
    if (data?.status === 200 && data.data) {
      setDuplicateCheckResult(
        data.data.result === 0 ? "available" : "duplicate"
      );
    } else {
      setDuplicateCheckResult("duplicate");
    }
    setIsChecking(false);
  };

  const handleSubmit = async () => {
    if (!isValid || duplicateCheckResult !== "available") return;
    const data = await requestUserData(
      USER_API_ENDPOINTS.UPDATE_NICKNAME,
      { nickname },
      session
    );

    if (data?.status === 200 && data.data) {
      await updateSession({
        ...session,
        userInfo: { ...session?.userInfo, nickname },
      });
      if (onSuccess) onSuccess(); // 다이얼로그 닫기 or 성공 알림
    }
  };

  return (
    <Card className="w-full max-w-md bg-white dark:bg-[#2a2d35] border-gray-200 dark:border-gray-700">
      <CardHeader>
        <CardTitle>{nicknameI18N.cardTitle[localeKey]}</CardTitle>
        <CardDescription>
          {nicknameI18N.cardDescription[localeKey]}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">
            {nicknameI18N.labelNickname[localeKey]}
          </label>
          <div className="relative">
            <Input
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder={nicknameI18N.placeholderNickname[localeKey]}
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
          <Button
            onClick={checkDuplicate}
            disabled={!isValid || isChecking}
            variant="outline"
            size="sm"
          >
            {isChecking
              ? nicknameI18N.checking[localeKey]
              : nicknameI18N.buttonCheckDuplicate[localeKey]}
          </Button>
        </div>

        {errors.map((e, i) => (
          <div key={i} className="text-sm text-red-500 flex gap-1">
            <AlertCircle className="h-3 w-3" /> {e}
          </div>
        ))}

        {duplicateCheckResult === "duplicate" && (
          <div className="text-red-500 text-sm flex gap-1">
            <XCircle className="h-3 w-3" />
            {nicknameI18N.duplicateError[localeKey]}
          </div>
        )}

        {duplicateCheckResult === "available" && (
          <div className="text-green-500 text-sm flex gap-1">
            <CheckCircle className="h-3 w-3" />
            {nicknameI18N.available[localeKey]}
          </div>
        )}

        <Button
          onClick={handleSubmit}
          disabled={!isValid || duplicateCheckResult !== "available"}
          className="w-full bg-orange-500 text-white"
        >
          {nicknameI18N.submitButton[localeKey]}
        </Button>
      </CardContent>
    </Card>
  );
}
