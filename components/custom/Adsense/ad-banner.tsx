"use client";

import React, { useEffect } from "react";
import { AdBannerTypes } from "./adsense.types";

export default function AdBanner({
  dataAdSlot,
  dataAdFormat,
  dataFullWidthResponsive,
  style,
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
    <ins
      className="adsbygoogle"
      style={{ display: "block", ...style }}
      data-ad-client={process.env.NEXT_PUBLIC_ADSENSE}
      data-ad-slot={dataAdSlot}
      data-ad-format={dataAdFormat}
      data-full-width-responsive={dataFullWidthResponsive.toString()}
    />
  );
}
