/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { AdBannerTypes } from "./adsense.types";

export default function AdBanner({ ...props }: AdBannerTypes) {
  const adRef = useRef<HTMLModElement>(null);
  const pathname = usePathname();
  const isLoaded = useRef(false);

  useEffect(() => {
    const currentIns = adRef.current;

    // 이미 광고가 로드되었는지 확인
    if (!currentIns || currentIns.getAttribute("data-ad-status")) {
      return;
    }

    // 이미 이 인스턴스에서 push했으면 스킵
    if (isLoaded.current) {
      return;
    }

    const timer = setTimeout(() => {
      try {
        (window as any).adsbygoogle = (window as any).adsbygoogle || [];
        (window as any).adsbygoogle.push({});
        isLoaded.current = true;
      } catch (e) {
        console.error("Google AdSense script load error:", e);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      isLoaded.current = false; // 클린업 시 리셋
    };
  }, [pathname]); // pathname 변경 시에만 재실행

  return (
    <div
      className="w-full text-center my-4 px-2"
      style={{ maxWidth: `${props.maxWidth ?? 970}px`, margin: "0 auto" }}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{
          display: "block",
          width: "100%",
          minHeight: 250,
          ...props.style,
        }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE}
        data-ad-slot={props.dataAdSlot}
        data-ad-format={props.dataAdFormat}
        data-full-width-responsive={
          props.dataFullWidthResponsive ? "true" : "false"
        }
      />
    </div>
  );
}
