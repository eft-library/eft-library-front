"use client";

import { useEffect, useMemo, useState, type CSSProperties } from "react";

type AdBannerProps = {
  dataAdSlot?: string;
  dataAdFormat?: "auto" | "horizontal" | "vertical" | "rectangle" | string | null;
  dataFullWidthResponsive?: boolean | null;
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

  const fullWidthResponsive =
    dataFullWidthResponsive === null
      ? undefined
      : dataFullWidthResponsive
        ? "true"
        : "false";

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
        data-ad-format={dataAdFormat ?? undefined}
        data-full-width-responsive={fullWidthResponsive}
      />
    </div>
  );
}

export function HorizontalAdBanner({
  className,
  maxWidth = 970,
  minHeight = 250,
}: {
  className?: string;
  maxWidth?: number;
  minHeight?: number;
}) {
  return (
    <AdBanner
      dataAdFormat={null}
      dataFullWidthResponsive={null}
      dataAdSlot={
        process.env.NEXT_PUBLIC_ADSENSE_HORIZONTAL_SLOT ??
        process.env.NEXT_PUBLIC_ADSENSE_SIDE_SLOT ??
        "8601640289"
      }
      maxWidth={maxWidth}
      minHeight={minHeight}
      className={`my-0 ${className ?? ""}`}
      style={{ display: "inline-block", height: minHeight, minWidth: 320 }}
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
      dataAdSlot={
        process.env.NEXT_PUBLIC_ADSENSE_SIDE_SLOT ??
        process.env.NEXT_PUBLIC_ADSENSE_VERTICAL_SLOT ??
        "2690838054"
      }
      maxWidth={maxWidth}
      minHeight={600}
      className={className}
      style={{ minWidth: 160, width: 160, height: 600 }}
    />
  );
}
