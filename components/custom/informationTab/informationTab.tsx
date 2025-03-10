"use client";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function InformationTab() {
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
        <span className="text-center font-bold">이벤트</span>
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
        <span className="text-center font-bold">패치노트</span>
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
        <span className="text-center font-bold">공지사항</span>
      </div>
    </div>
  );
}
