/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect } from "react";
import { AdBannerTypes } from "./adsense.types";

export default function AdBanner({
  dataAdSlot,
  dataAdFormat,
  dataFullWidthResponsive,
  style,
  maxWidth = 970,
}: AdBannerTypes) {
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        (window as any).adsbygoogle = (window as any).adsbygoogle || [];
        (window as any).adsbygoogle.push({});
      }
    } catch (e) {
      console.error("Google AdSense script load error:", e);
    }
  }, []);

  return (
    <div
      className="w-full text-center my-4 px-2"
      style={{ maxWidth: `${maxWidth}px`, margin: "0 auto" }}
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block", width: "100%", ...style }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE}
        data-ad-slot={dataAdSlot}
        data-ad-format={dataAdFormat}
        data-full-width-responsive={dataFullWidthResponsive.toString()}
      />
    </div>
  );
}
