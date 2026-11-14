"use client";
import Image from "next/image";
import { Box } from "lucide-react";
import { useState } from "react";
import type { ItemSummary } from "../types";
export function PartImage({ item, large = false, image }: { item: ItemSummary; large?: boolean; image?: string | null }) {
  const [failed, setFailed] = useState<string[]>([]);
  const src = [image, item.image].find((url) => !!url && !failed.includes(url));
  return src ? <Image src={src} alt="" width={large ? 296 : 80} height={large ? 104 : 40} unoptimized draggable={false} className={large ? "h-full w-full object-contain p-1.5" : "h-10 w-full object-contain"} onError={() => setFailed((old) => [...old, src])} /> : <Box aria-hidden="true" className="mx-auto size-7 text-gray-500 dark:text-gray-400" />;
}
export function PartChips({ item }: { item?: ItemSummary }) {
  const values = [[item?.mod_properties?.ergonomics, "E", true], [item?.mod_properties?.recoil_modifier == null ? null : item.mod_properties.recoil_modifier * 100, "R%", false]] as const;
  return <span className="flex h-4 justify-center gap-0.5 whitespace-nowrap">{values.map(([value, label, up]) => value == null || value === 0 ? null : <span key={label} className={`rounded px-0.5 font-mono text-[9px] leading-4 ${(up ? value > 0 : value < 0) ? "bg-green-100 text-green-900 dark:bg-green-900/80 dark:text-green-200" : "bg-red-100 text-red-900 dark:bg-red-900/80 dark:text-red-200"}`}>{label} {value > 0 ? "+" : ""}{new Intl.NumberFormat("en", { maximumFractionDigits: 2 }).format(value)}</span>)}</span>;
}
