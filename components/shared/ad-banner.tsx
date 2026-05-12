"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";

type AdBannerProps = {
  dataAdSlot?: string;
  dataAdFormat?: "auto" | "horizontal" | "vertical" | "rectangle" | string;
  dataFullWidthResponsive?: boolean;
  maxWidth?: number;
  minHeight?: number;
  className?: string;
  style?: CSSProperties;
};

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

export function AdBanner({
  dataAdSlot = process.env.NEXT_PUBLIC_ADSENSE_VERTICAL_SLOT ?? "2690838054",
  dataAdFormat = "auto",
  dataFullWidthResponsive = true,
  maxWidth = 1220,
  minHeight = 250,
  className = "",
  style,
}: AdBannerProps) {
  const [isMounted, setIsMounted] = useState(false);
  const clientId = process.env.NEXT_PUBLIC_ADSENSE;

  const mergedStyle = useMemo<CSSProperties>(
    () => ({
      display: "block",
      width: "100%",
      minHeight,
      ...style,
    }),
    [minHeight, style],
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !clientId || !dataAdSlot) {
      return;
    }

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch (error) {
      console.error("Google AdSense script load error:", error);
    }
  }, [clientId, dataAdSlot, isMounted]);

  if (!isMounted || !clientId || !dataAdSlot) {
    return null;
  }

  return (
    <div
      className={`mx-auto my-4 w-full px-2 text-center ${className}`}
      style={{ maxWidth }}
    >
      <ins
        className="adsbygoogle"
        style={mergedStyle}
        data-ad-client={clientId}
        data-ad-slot={dataAdSlot}
        data-ad-format={dataAdFormat}
        data-full-width-responsive={dataFullWidthResponsive ? "true" : "false"}
      />
    </div>
  );
}

export function HorizontalAdBanner({
  className,
  maxWidth = 1220,
}: {
  className?: string;
  maxWidth?: number;
}) {
  return (
    <AdBanner
      dataAdFormat="auto"
      dataFullWidthResponsive
      dataAdSlot={
        process.env.NEXT_PUBLIC_ADSENSE_HORIZONTAL_SLOT ??
        process.env.NEXT_PUBLIC_ADSENSE_VERTICAL_SLOT ??
        "2690838054"
      }
      maxWidth={maxWidth}
      className={className}
    />
  );
}

export function VerticalAdBanner({
  className,
  maxWidth = 160,
}: {
  className?: string;
  maxWidth?: number;
}) {
  return (
    <AdBanner
      dataAdFormat="vertical"
      dataFullWidthResponsive={false}
      dataAdSlot={process.env.NEXT_PUBLIC_ADSENSE_VERTICAL_SLOT ?? "2690838054"}
      maxWidth={maxWidth}
      minHeight={600}
      className={className}
      style={{ minWidth: 120 }}
    />
  );
}
