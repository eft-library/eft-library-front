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
  lazy?: boolean;
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
  lazy = false,
}: AdBannerProps) {
  const container = useRef<HTMLDivElement>(null);
  const requested = useRef(false);
  const [hasWidth, setHasWidth] = useState(false);
  const [isNearViewport, setIsNearViewport] = useState(!lazy);
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
    const element = container.current;
    if (!element || isNearViewport) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        observer.disconnect();
        setIsNearViewport(true);
      }
    }, { rootMargin: "600px 0px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, [isNearViewport]);

  useEffect(() => {
    if (!hasWidth || !isNearViewport || !clientId || !dataAdSlot || requested.current) {
      return;
    }

    requested.current = true;
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
    } catch (error) {
      console.error("Google AdSense script load error:", error);
    }
  }, [clientId, dataAdSlot, hasWidth, isNearViewport]);

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
      className={`mx-auto my-4 min-w-0 w-full px-2 text-center has-[>ins[data-ad-status=unfilled]]:hidden ${className}`}
      style={{ maxWidth }}
    >
      {hasWidth && isNearViewport && <ins
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
      dataAdSlot={
        process.env.NEXT_PUBLIC_ADSENSE_TOP_SLOT ??
        process.env.NEXT_PUBLIC_ADSENSE_HORIZONTAL_SLOT ??
        process.env.NEXT_PUBLIC_ADSENSE_SIDE_SLOT ??
        "8601640289"
      }
      maxWidth={maxWidth}
      minHeight={minHeight}
      className={`my-0 overflow-hidden ${className ?? ""}`}
    />
  );
}

export function VerticalAdBanner({
  className,
  maxWidth = 160,
  side,
}: {
  className?: string;
  maxWidth?: number;
  side?: "left" | "right";
}) {
  const railSlot = side === "left" ? process.env.NEXT_PUBLIC_ADSENSE_RAIL_LEFT_SLOT
    : side === "right" ? process.env.NEXT_PUBLIC_ADSENSE_RAIL_RIGHT_SLOT : undefined;

  return (
    <AdBanner
      dataAdFormat="vertical"
      dataFullWidthResponsive={false}
      dataAdSlot={
        railSlot ??
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

export function ContentWidthAdBanner({ compact = false }: { compact?: boolean }) {
  return (
    <AdBanner
      dataAdSlot={
        process.env.NEXT_PUBLIC_ADSENSE_IN_CONTENT_SLOT ??
        process.env.NEXT_PUBLIC_ADSENSE_HORIZONTAL_SLOT ??
        process.env.NEXT_PUBLIC_ADSENSE_SIDE_SLOT ??
        "8601640289"
      }
      maxWidth={compact ? 728 : undefined}
      minHeight={0}
      className={compact
        ? "my-0 overflow-hidden px-0 [--content-ad-height:100px]"
        : "my-8 overflow-hidden px-0 [--content-ad-height:100px] sm:[--content-ad-height:250px]"}
      style={{ minHeight: "var(--content-ad-height)" }}
      lazy
    />
  );
}
