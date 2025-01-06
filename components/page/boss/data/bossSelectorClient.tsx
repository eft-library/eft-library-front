"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";
import TextSpan from "../../../custom/gridContents/textSpan";

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
            <TextSpan>{boss.name_kr}</TextSpan>
          </div>
        </Link>
      ))}
    </div>
  );
}
