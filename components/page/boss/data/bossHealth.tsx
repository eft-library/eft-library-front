"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { formatImage } from "@/lib/func/formatImage";
import ImageView from "../../../custom/imageView/imageView";
import TextSpan from "../../../custom/gridContents/textSpan";
import type { BossHealth } from "./bossTypes";

export default function BossHealth({ subFollowers }: BossHealth) {
  const [healthId, setHealthId] = useState<string>("");

  const clickHealth = (health: string) => {
    setHealthId(health);
  };

  useEffect(() => {
    if (subFollowers.length > 0) {
      setHealthId(subFollowers[0].id);
    }
  }, [subFollowers]);

  return (
    <div>
      {subFollowers && (
        <div className="flex flex-col justify-center items-center w-full gap-4">
          <div className="flex justify-center w-full flex-wrap gap-4">
            {subFollowers.map((follower) => (
              <div
                key={`${follower.id}-health`}
                onClick={() => clickHealth(follower.id)}
                className={cn(
                  "rounded-lg flex justify-center items-center p-[8px] w-[120px] h-[40px] cursor-pointer hover:bg-NeutralGray border-solid border-[1px] border-white",
                  { "bg-NeutralGray": healthId === follower.id }
                )}
              >
                <TextSpan>{follower.name_kr}</TextSpan>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center">
            {subFollowers.map(
              (follower) =>
                follower.id === healthId && (
                  <ImageView
                    key={`${follower.id}-health-image`}
                    src={formatImage(follower.health_image)}
                    alt={follower.name_en}
                    popWidth={580}
                    popHeight={600}
                    size="580px"
                    wrapWidth={580}
                    wrapHeight={600}
                  />
                )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
