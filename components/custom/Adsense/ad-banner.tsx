"use client";

import { useEffect, useRef } from "react";
import { AdBannerTypes } from "./adsense.types";

export default function AdBanner(props: AdBannerTypes) {
  const adRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    try {
      if (!adRef.current) return;

      (window as any).adsbygoogle = (window as any).adsbygoogle || [];

      (window as any).adsbygoogle.push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

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
