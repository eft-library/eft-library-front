"use client";

import { toast } from "sonner";
import { useDetectAdBlock } from "adblock-detect-react";
import { useEffect } from "react";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { adBlockI18N } from "@/lib/consts/i18nConsts";
import { CircleX } from "lucide-react";

export default function AdBlockAlert() {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const adBlockDetected = useDetectAdBlock();

  useEffect(() => {
    if (adBlockDetected) {
      toast(adBlockI18N.adblockDetected[localeKey], {
        description: (
          <>
            <span style={{ display: "block", color: "#B8B8B8" }}>
              {adBlockI18N.adSupportNotice[localeKey]}
            </span>
            <span style={{ display: "block", color: "#B8B8B8" }}>
              {adBlockI18N.adUnblockRequest[localeKey]}
            </span>
          </>
        ),
        action: {
          label: <CircleX />,
          onClick: () => {},
        },
        style: {
          backgroundColor: "black", // 배경색
          color: "#fff", // 텍스트 색상
          padding: "16px", // 패딩
          border: "2px solid white",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // 그림자
          fontSize: "16px", // 폰트 크기,
          width: "400px",
        },
        duration: Infinity,
      });
    }
  }, [adBlockDetected]);

  return null;
}
