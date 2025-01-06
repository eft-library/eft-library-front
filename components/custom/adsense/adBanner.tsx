"use client";

import React, { useEffect } from "react";

type AdBannerTypes = {
  dataAdSlot: string;
  dataAdFormat: string;
  dataFullWidthResponsive: boolean;
};

export default function AdBanner({
  dataAdSlot,
  dataAdFormat,
  dataFullWidthResponsive,
}: AdBannerTypes) {
  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
        {}
      );
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <div className="bg-Background">
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
        }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE}
        data-ad-slot={dataAdSlot}
        data-ad-format={dataAdFormat}
        data-full-width-resposive={dataFullWidthResponsive.toString()}
      ></ins>
    </div>
  );
}
