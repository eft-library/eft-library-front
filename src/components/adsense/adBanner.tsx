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
    <ins
      className="adsbygoogle"
      style={{
        display: "flex",
        justifyContent: "center",
        background: "transparent",
      }}
      data-ad-client={process.env.NEXT_PUBLIC_ADSENSE}
      data-ad-slot={dataAdSlot}
      data-ad-format={dataAdFormat}
      data-ad-layout="in-article"
      data-full-width-resposive={dataFullWidthResponsive.toString()}
    ></ins>
  );
}
