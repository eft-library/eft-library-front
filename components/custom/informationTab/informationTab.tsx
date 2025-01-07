"use client";
import { usePathname, useRouter } from "next/navigation";
import TextSpan from "../gridContents/textSpan";
import { cn } from "@/lib/utils";

export default function InformationTab() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex gap-4 w-full  justify-center items-center">
      <div
        className={cn(
          "cursor-pointer p-4 border-white boder-solid border-2 rounded-full w-40 justify-center items-center hover:bg-NeutralGray flex",
          {
            "bg-NeutralGray":
              pathname.split("/").filter(Boolean)[0] === "event",
          }
        )}
        onClick={() => router.push("/event?id=1")}
      >
        <TextSpan size="2xl">이벤트</TextSpan>
      </div>
      <div
        className={cn(
          "cursor-pointer p-4 border-white boder-solid border-2 rounded-full w-40 justify-center items-center hover:bg-NeutralGray flex",
          {
            "bg-NeutralGray":
              pathname.split("/").filter(Boolean)[0] === "patch-notes",
          }
        )}
        onClick={() => router.push("/patch-notes?id=1")}
      >
        <TextSpan size="2xl">패치노트</TextSpan>
      </div>
      <div
        className={cn(
          "cursor-pointer p-4 border-white boder-solid border-2 rounded-full w-40 justify-center items-center hover:bg-NeutralGray flex",
          {
            "bg-NeutralGray":
              pathname.split("/").filter(Boolean)[0] === "notice",
          }
        )}
        onClick={() => router.push("/notice?id=1")}
      >
        <TextSpan size="2xl">공지사항</TextSpan>
      </div>
    </div>
  );
}
