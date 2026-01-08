"use client";

import { Button } from "@/components/ui/button";
import { ProgressItemBoxTypes } from "./progress.types";
import Image from "next/image";

export default function ProgressItem({
  item,
  handleClick,
}: ProgressItemBoxTypes) {
  return (
    <Button
      key={item.id}
      onClick={() => handleClick(item.id)}
      className="group flex flex-col items-center gap-2 rounded-lg p-3 transition-colors hover:bg-accent"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-border bg-muted">
        <Image
          src={item.image}
          alt={item.name.en}
          width={120}
          height={120}
          className="w-32 h-30 object-contain rounded-lg group-hover:scale-105 transition-transform duration-200"
          //   className={`h-full w-full object-cover transition-all ${
          //     isCollected ? "brightness-50" : "group-hover:scale-110"
          //   }`}
        />
        {/* {isCollected && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500">
              <Check className="h-8 w-8 text-white" strokeWidth={3} />
            </div>
          </div>
        )} */}
      </div>

      <p className="text-center text-xs font-medium text-foreground line-clamp-2">
        {item.name.en}
      </p>
    </Button>
  );
}
