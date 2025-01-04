"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";

interface BossSelectorClient {
  bossType: BossType;
}

interface BossType {
  id: string;
  json_value: BossJson[];
}

interface BossJson {
  id: string;
  link: string;
  order: number;
  name_kr: string;
}

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
            <span className="text-base text-center font-bold">
              {boss.name_kr}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
