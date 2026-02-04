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
      className="prose prose-sm dark:prose-invert max-w-none
        [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:mb-4
        [&_p]:leading-relaxed [&_p]:mb-3"
      dangerouslySetInnerHTML={{ __html: html }}
      onClick={handleClick}
    />
  );
});

export default StoryGuide;
