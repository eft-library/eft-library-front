"use client";

import { usePathname } from "next/navigation";

import { VerticalAdBanner } from "@/components/shared/ad-banner";

const disabledPrefixes: string[] = [];
const railPositionClass =
  "pointer-events-none fixed top-1/2 z-10 hidden w-40 -translate-y-1/2 2xl:block";

function isDisabledPath(pathname: string) {
  return disabledPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export function AdSideRails() {
  const pathname = usePathname();

  if (isDisabledPath(pathname)) {
    return null;
  }

  return (
    <>
      <aside
        aria-label="Left advertisement"
        className={`${railPositionClass} left-4 [@media(min-width:1664px)]:left-[max(1rem,calc((100vw-1280px)/2-12rem))]`}
      >
        <div className="pointer-events-auto">
          <VerticalAdBanner className="my-0 px-0" />
        </div>
      </aside>
      <aside
        aria-label="Right advertisement"
        className={`${railPositionClass} right-4 [@media(min-width:1664px)]:right-[max(1rem,calc((100vw-1280px)/2-12rem))]`}
      >
        <div className="pointer-events-auto">
          <VerticalAdBanner className="my-0 px-0" />
        </div>
      </aside>
    </>
  );
}
