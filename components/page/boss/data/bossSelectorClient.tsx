"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";
import { bossColumn } from "@/lib/consts/columnConsts";

export default function BossSelectorClient() {
  const param = useParams<{ id: string }>();

  return (
    <div className="flex justify-between w-full flex-wrap rounded-lg border-solid border-2 border-white p-1">
      {bossColumn.map((boss) => (
        <Link href={boss.link} key={boss.id}>
          <div
            className={cn(
              "rounded-lg flex justify-center items-center p-[8px] px-6 h-[40px] cursor-pointer hover:bg-NeutralGray",
              { "bg-CloudGray": param.id === boss.id },
              { "text-Background": param.id === boss.id }
            )}
          >
            <span className="text-center font-bold">{boss.name_kr}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
