"use client";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import Link from "next/link";
import { StorySelectorTypes } from "../story-types";
import { getStorySVG } from "@/assets/story/storySvg";

export default function StorySelector({ selector }: StorySelectorTypes) {
  const { id } = useParams<{ id: string }>();
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  return (
    <div className="mb-16">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 md:gap-4">
        {selector.map((story) => (
          <Link key={story.id} href={`/story/${story.id}`}>
            <button
              className={cn(
                "group relative overflow-hidden rounded-lg border-2 p-4 transition-all duration-200 bg-secondary",
                "dark:bg-white/[0.02] dark:border-gray-600 dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03),0_2px_8px_rgba(0,0,0,0.4)]",
                "hover:border-primary hover:bg-card/80 hover:shadow-lg hover:shadow-primary/20",
                "dark:hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.03),0_3px_12px_rgba(0,0,0,0.5)]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring cursor-pointer",
                id === story.id &&
                  "border-primary dark:border-gray-300 bg-card/80 shadow-lg shadow-primary/30",
              )}
            >
              <div className="flex flex-col items-center gap-3">
                {/* Icon */}
                <div
                  className={cn(
                    "flex h-30 w-30 items-center justify-center rounded-lg bg-secondary/50 p-3 transition-all",
                    "dark:bg-black/20",
                    "group-hover:bg-secondary group-hover:scale-110",
                    id === story.id && "bg-secondary scale-110",
                  )}
                >
                  {getStorySVG(story.id, 80, 80, "#c7e0e9")}
                </div>
                {/* Title */}
                <h3
                  className={cn(
                    "text-center text-sm font-semibold text-card-foreground transition-colors",
                    "dark:text-white",
                    "group-hover:text-primary",
                    id === story.id && "text-primary",
                  )}
                >
                  {story.name[localeKey]}
                </h3>
              </div>
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}
