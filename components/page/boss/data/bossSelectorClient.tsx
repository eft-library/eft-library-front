"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";
import type { BossSelectorClient } from "./bossTypes";

export default function BossSelectorClient({ bossType }: BossSelectorClient) {
  const param = useParams<{ id: string }>();

  return (
    <div className="flex justify-center w-full flex-wrap gap-4">
      {bossType.json_value.map((boss) => (
        <Link href={boss.link} key={boss.id}>
          <div
            className={cn(
              "rounded-lg flex justify-center items-center p-[8px] w-[120px] h-[40px] cursor-pointer hover:bg-NeutralGray border-solid border-[1px] border-white",
              { "bg-NeutralGray": param.id === boss.id }
            )}
          >
            <span className="text-center">{boss.name_kr}</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
