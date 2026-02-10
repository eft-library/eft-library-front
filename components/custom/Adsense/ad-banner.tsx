/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { AdBannerTypes } from "./adsense.types";

export default function AdBanner({ ...props }: AdBannerTypes) {
  const adRef = useRef<HTMLModElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const currentIns = adRef.current;
    if (!currentIns) return;

    if (currentIns.getAttribute("data-ad-status")) {
      currentIns.innerHTML = ""; // 내용 초기화
      currentIns.removeAttribute("data-ad-status");
      currentIns.removeAttribute("data-adsbygoogle-status");
    }

    const timer = setTimeout(() => {
      try {
        (window as any).adsbygoogle = (window as any).adsbygoogle || [];
        (window as any).adsbygoogle.push({});
      } catch (e) {
        console.error("Google AdSense script load error:", e);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div
      className="w-full text-center my-4 px-2"
      style={{ maxWidth: `${props.maxWidth ?? 970}px`, margin: "0 auto" }}
    >
      <ins
        ref={adRef}
        key={pathname}
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
