"use client";

import { toast } from "sonner";
import { useDetectAdBlock } from "adblock-detect-react";
import { useEffect } from "react";

export default function AdBlockAlert() {
  const adBlockDetected = useDetectAdBlock();

  useEffect(() => {
    if (adBlockDetected) {
      toast("광고 차단이 감지되었습니다.", {
        description: (
          <>
            <span style={{ display: "block", color: "#B8B8B8" }}>
              EFT Library는 광고로 유지됩니다.
            </span>
            <span style={{ display: "block", color: "#B8B8B8" }}>
              차단을 해제해 주시면 많은 도움이 됩니다!
            </span>
          </>
        ),
        action: {
          label: "닫기",
          onClick: () => {},
        },
        style: {
          backgroundColor: "black", // 배경색
          color: "#fff", // 텍스트 색상
          padding: "16px", // 패딩
          border: "2px solid white",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // 그림자
          fontSize: "16px", // 폰트 크기,
          width: "380px",
        },
        duration: Infinity,
      });
    }
  }, [adBlockDetected]);

  return null;
}
