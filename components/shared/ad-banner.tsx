"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

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
  const container = useRef<HTMLDivElement>(null);
  const requested = useRef(false);
  const [hasWidth, setHasWidth] = useState(false);
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
    const element = container.current;
    if (!element || hasWidth) return;
    if (element.clientWidth > 0) {
      setHasWidth(true);
      return;
    }
    const observer = new ResizeObserver(() => {
      if (element.clientWidth > 0) {
        observer.disconnect();
        setHasWidth(true);
      }
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [hasWidth]);

  useEffect(() => {
    if (!hasWidth || !clientId || !dataAdSlot || requested.current) {
      return;
    }

    requested.current = true;
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch (error) {
      console.error("Google AdSense script load error:", error);
    }
  }, [clientId, dataAdSlot, hasWidth]);

  if (!clientId || !dataAdSlot) {
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
      ref={container}
      className={`mx-auto my-4 w-full px-2 text-center ${className}`}
      style={{ maxWidth }}
    >
      {hasWidth && <ins
        className="adsbygoogle"
        style={mergedStyle}
        data-ad-client={clientId}
        data-ad-slot={dataAdSlot}
        data-ad-format={dataAdFormat ?? undefined}
        data-full-width-responsive={fullWidthResponsive}
      />}
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

export function ContentWidthAdBanner({ label }: { label: string }) {
  return (
    <div className="my-8 min-h-[calc(var(--content-ad-height)+2rem)] w-full border-y border-line py-2 [--content-ad-height:100px] sm:[--content-ad-height:250px]">
      <p className="text-center text-[10px] text-gray-600 dark:text-gray-400">{label}</p>
      <AdBanner
        dataAdSlot={process.env.NEXT_PUBLIC_ADSENSE_HORIZONTAL_SLOT ??
          process.env.NEXT_PUBLIC_ADSENSE_SIDE_SLOT ?? "8601640289"}
        dataAdFormat="horizontal"
        minHeight={0}
        className="my-0! px-0!"
        style={{ minHeight: "var(--content-ad-height)" }}
      />
    </div>
  );
}
