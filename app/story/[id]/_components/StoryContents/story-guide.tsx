import { memo } from "react";
import { StoryGuideTypes } from "../story-types";

const StoryGuide = memo(function StoryGuide({
  html,
  onImageClick,
}: StoryGuideTypes) {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.tagName === "IMG") {
      onImageClick((target as HTMLImageElement).src);
    }
  };

  return (
    <div
      className="prose prose-sm dark:prose-invert max-w-none [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:mb-4 [&_h3]:mt-8 [&_h3:first-child]:mt-0 [&_h3]:text-foreground dark:[&_h3]:text-white/90 [&_p]:leading-relaxed [&_p]:text-foreground [&_p]:mb-3 [&_table]:w-full [&_table]:border-collapse [&_table]:my-6 [&_th]:border [&_th]:border-border [&_th]:bg-muted/70 [&_th]:p-3 [&_th]:text-center [&_th]:align-middle [&_th]:font-semibold dark:[&_th]:border-white/10 dark:[&_th]:bg-white/10 [&_td]:border [&_td]:border-border [&_td]:p-3 [&_td]:text-center [&_td]:align-middle dark:[&_td]:border-white/10 [&_td_img]:inline-block [&_td_img]:h-12 [&_td_img]:w-12 [&_td_img]:mx-auto dark:[--tw-prose-body:theme(colors.white)]"
      dangerouslySetInnerHTML={{ __html: html }}
      onClick={handleClick}
    />
  );
});

export default StoryGuide;
