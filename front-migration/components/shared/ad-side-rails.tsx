"use client";

import { usePathname } from "next/navigation";

import { VerticalAdBanner } from "@/components/shared/ad-banner";

const disabledPrefixes: string[] = [];

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
        className="pointer-events-none fixed left-4 top-24 z-10 hidden w-40 xl:block 2xl:left-[max(1rem,calc((100vw-1536px)/2))]"
      >
        <div className="pointer-events-auto sticky top-24">
          <VerticalAdBanner className="my-0 px-0" />
        </div>
      </aside>
      <aside
        aria-label="Right advertisement"
        className="pointer-events-none fixed right-4 top-24 z-10 hidden w-40 xl:block 2xl:right-[max(1rem,calc((100vw-1536px)/2))]"
      >
        <div className="pointer-events-auto sticky top-24">
          <VerticalAdBanner className="my-0 px-0" />
        </div>
      </aside>
    </>
  );
}
