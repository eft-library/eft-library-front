"use client";

import { ALL_COLOR } from "@/util/consts/colorConsts";
import React, { useEffect } from "react";

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
  isHorizontal = false,
}: AdBannerTypes) {
  useEffect(() => {
    try {
      // 광고를 로드한 후
      (window.adsbygoogle = window.adsbygoogle || []).push({});

      // 광고 로드 후 #google-center-div의 배경색을 변경
      const adContainer = document.getElementById("google-center-div");
      if (adContainer) {
        adContainer.style.backgroundColor = ALL_COLOR.BACKGROUND; // 배경색을 black으로 설정
      }
    } catch (e) {
      console.error("Google AdSense 광고 로드 오류:", e);
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
