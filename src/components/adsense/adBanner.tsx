"use client";

import { ALL_COLOR } from "@/util/consts/colorConsts";
import React, { useEffect } from "react";
import "@/assets/ad.css";

type AdBannerTypes = {
  dataAdSlot: string;
  dataAdFormat: string;
  dataFullWidthResponsive: boolean;
  isHorizontal?: boolean;
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
        backgroundColor: ALL_COLOR.BACKGROUND,
        justifyContent: "center",
      }}
      data-ad-client={process.env.NEXT_PUBLIC_ADSENSE}
      data-ad-slot={dataAdSlot}
      data-ad-format={dataAdFormat}
      data-ad-layout="in-article"
      data-full-width-resposive={dataFullWidthResponsive.toString()}
    ></ins>
  );
}
