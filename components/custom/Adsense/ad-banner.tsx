/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { AdBannerTypes } from "./adsense.types";

export default function AdBanner({ ...props }: AdBannerTypes) {
  const [showAd, setShowAd] = useState(false);

  useEffect(() => {
    setShowAd(true);
  }, []);

  useEffect(() => {
    if (showAd) {
      try {
        (window as any).adsbygoogle = (window as any).adsbygoogle || [];
        (window as any).adsbygoogle.push({});
      } catch (e) {
        console.error("Google AdSense script load error:", e);
      }
    }
  }, [showAd]);

  if (!showAd) return null;

  return (
    <div
      className="w-full text-center my-4 px-2"
      style={{ maxWidth: `${props.maxWidth ?? 970}px`, margin: "0 auto" }}
    >
      <ins
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
