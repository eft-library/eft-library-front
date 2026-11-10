"use client";

import { usePathname } from "next/navigation";

import { VerticalAdBanner } from "@/components/shared/ad-banner";

const disabledPrefixes = ["/live-map"];
const railPositionClass =
  "pointer-events-none fixed top-1/2 z-10 hidden w-40 -translate-y-1/2";

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

  // A 1600px workbench needs 160px ads + 32px gaps + 16px edge
  // margins on each side. Hide rails below that width, including their hit areas.
  const wideWorkbench =
    pathname === "/modding" || pathname.startsWith("/modding/");
  const visibility = wideWorkbench ? "min-[2016px]:block" : "2xl:block";
  const left = wideWorkbench
    ? "left-[max(1rem,calc((100vw-1600px)/2-12rem))]"
    : "left-4 [@media(min-width:1664px)]:left-[max(1rem,calc((100vw-1280px)/2-12rem))]";
  const right = wideWorkbench
    ? "right-[max(1rem,calc((100vw-1600px)/2-12rem))]"
    : "right-4 [@media(min-width:1664px)]:right-[max(1rem,calc((100vw-1280px)/2-12rem))]";
  return (
    <>
      <aside
        aria-label="Left advertisement"
        className={`${railPositionClass} ${visibility} ${left}`}
      >
        <div className="pointer-events-auto">
          <VerticalAdBanner className="my-0 px-0" />
        </div>
      </aside>
      <aside
        aria-label="Right advertisement"
        className={`${railPositionClass} ${visibility} ${right}`}
      >
        <div className="pointer-events-auto">
          <VerticalAdBanner className="my-0 px-0" />
        </div>
      </aside>
    </>
  );
}
