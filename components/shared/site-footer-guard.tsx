"use client";

import { usePathname } from "next/navigation";

import { SiteFooter } from "@/components/shared/site-footer";

const disabledPrefixes = ["/live-map"];

function isDisabledPath(pathname: string) {
  return disabledPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export function SiteFooterGuard() {
  const pathname = usePathname();

  if (isDisabledPath(pathname)) {
    return null;
  }

  return <SiteFooter />;
}
