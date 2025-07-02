"use client";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { newsI18N } from "@/lib/consts/i18nConsts";

export default function InformationTab() {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex w-full justify-around flex-wrap rounded-lg border-solid border-2 border-white gap-1 p-1">
      <div
        className={cn(
          "rounded-lg flex justify-center items-center p-[8px] px-6 h-[40px] cursor-pointer hover:bg-NeutralGray",
          {
            "bg-CloudGray": pathname.split("/").filter(Boolean)[0] === "event",
          },
          {
            "text-Background":
              pathname.split("/").filter(Boolean)[0] === "event",
          }
        )}
        onClick={() => router.push("/event?id=1")}
      >
        <span className="text-center font-bold">
          {newsI18N.event[localeKey]}
        </span>
      </div>
      <div
        className={cn(
          "rounded-lg flex justify-center items-center p-[8px] px-6 h-[40px] cursor-pointer hover:bg-NeutralGray",
          {
            "bg-CloudGray":
              pathname.split("/").filter(Boolean)[0] === "patch-notes",
          },
          {
            "text-Background":
              pathname.split("/").filter(Boolean)[0] === "patch-notes",
          }
        )}
        onClick={() => router.push("/patch-notes?id=1")}
      >
        <span className="text-center font-bold">
          {newsI18N.patchNote[localeKey]}
        </span>
      </div>
      <div
        className={cn(
          "rounded-lg flex justify-center items-center p-[8px] px-6 h-[40px] cursor-pointer hover:bg-NeutralGray",
          {
            "bg-CloudGray": pathname.split("/").filter(Boolean)[0] === "notice",
          },
          {
            "text-Background":
              pathname.split("/").filter(Boolean)[0] === "notice",
          }
        )}
        onClick={() => router.push("/notice?id=1")}
      >
        <span className="text-center font-bold">
          {newsI18N.notice[localeKey]}
        </span>
      </div>
    </div>
  );
}
