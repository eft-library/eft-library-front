/* eslint-disable @next/next/no-img-element */

"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { StoryContentsTypes } from "../story-types";
import { storyI18N } from "@/lib/consts/i18nConsts";
import { useState, useRef } from "react";
import {
  DialogHeader,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";

export default function StoryContents({ storyDetail }: StoryContentsTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  const [selectedImage, setSelectedImage] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const lastPos = useRef({ x: 0, y: 0 });

  const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
    const img = event.target as HTMLImageElement;
    if (img.tagName === "IMG") {
      setSelectedImage(img.src);
      setIsOpen(true);
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  };

  // 마우스 휠로 확대/축소
  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    const delta = -event.deltaY * 0.001;
    setScale((prev) => Math.min(Math.max(prev + delta, 0.5), 3));
  };

  // 마우스 드래그 시작
  const handleMouseDown = (event: React.MouseEvent) => {
    if (scale <= 1) return; // 확대 상태에서만 드래그 가능
    setIsDragging(true);
    lastPos.current = { x: event.clientX, y: event.clientY };
  };

  // 드래그 중
  const handleMouseMove = (event: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = event.clientX - lastPos.current.x;
    const dy = event.clientY - lastPos.current.y;
    lastPos.current = { x: event.clientX, y: event.clientY };
    setPosition((prev) => ({
      x: prev.x + dx,
      y: prev.y + dy,
    }));
  };

  // 드래그 종료
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseLeave = () => setIsDragging(false);

  return (
    <div className="space-y-6">
      {/* Prerequisites */}
      {storyDetail.requirements &&
        storyDetail.requirements[localeKey].length > 0 && (
          <Card className="border-border/50 shadow-xl dark:bg-white/2 dark:border-transparent dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04),0_4px_16px_rgba(0,0,0,0.4)] bg-secondary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl dark:text-white">
                <span className="text-primary dark:text-blue-400">{"🔑"}</span>
                <span>{storyI18N.prerequisites[localeKey]}</span>
              </CardTitle>
              <CardDescription className="dark:text-white">
                {storyI18N.unlockConditionDesc[localeKey]}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className="prose prose-sm dark:prose-invert max-w-none [&_p]:leading-relaxed [&_p]:text-foreground dark:[&_p]:text-white/65 [&_p]:mb-2 [&_p:last-child]:mb-0"
                dangerouslySetInnerHTML={{
                  __html: storyDetail.requirements[localeKey],
                }}
              />
            </CardContent>
          </Card>
        )}

      {/* Objectives */}
      {storyDetail.objectives &&
        storyDetail.objectives[localeKey].length > 0 && (
          <Card className="border-border/50 shadow-xl dark:bg-white/2 dark:border-transparent dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04),0_4px_16px_rgba(0,0,0,0.4)] bg-secondary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl dark:text-white">
                <span className="text-primary dark:text-blue-400">{"🎯"}</span>
                <span>{storyI18N.objectives[localeKey]}</span>
              </CardTitle>
              <CardDescription className="dark:text-white">
                {storyI18N.objectivesDesc[localeKey]}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className="prose prose-sm dark:prose-invert max-w-none [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_li]:leading-relaxed [&_li]:text-foreground dark:[&_li]:text-white [&_ul_ul]:list-circle [&_ul_ul]:mt-2"
                dangerouslySetInnerHTML={{
                  __html: storyDetail.objectives[localeKey],
                }}
              />
            </CardContent>
          </Card>
        )}

      {/* Guide */}
      {storyDetail.guide && storyDetail.guide[localeKey].length > 0 && (
        <Card className="border-border/50 shadow-xl dark:bg-white/2 dark:border-transparent dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04),0_4px_16px_rgba(0,0,0,0.4)] bg-secondary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl dark:text-white">
              <span className="text-primary dark:text-blue-400">{"📖"}</span>
              <span>{storyI18N.guide[localeKey]}</span>
            </CardTitle>
            <CardDescription className="dark:text-white">
              {storyI18N.guideDesc[localeKey]}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className="prose  prose-sm  dark:prose-invert  max-w-none [&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:mb-4 
              [&_h3]:mt-8 [&_h3:first-child]:mt-0 [&_h3]:text-foreground dark:[&_h3]:text-white/90[&_p]:leading-relaxed [&_p]:text-foreground 
              [&_p]:mb-3 [&_table]:w-full [&_table]:border-collapse [&_table]:my-6 [&_th]:border [&_th]:border-border [&_th]:bg-muted/70 [&_th]:p-3 
              [&_th]:text-center [&_th]:align-middle [&_th]:font-semibold dark:[&_th]:border-white/10 dark:[--tw-prose-body:var(--color-white)]
              dark:[&_th]:bg-white/10 [&_td]:border [&_td]:border-border [&_td]:p-3 [&_td]:text-center [&_td]:align-middle dark:[&_td]:border-white/10 
              [&_td_img]:inline-block [&_td_img]:h-12 [&_td_img]:w-12 [&_td_img]:mx-auto"
              dangerouslySetInnerHTML={{
                __html: storyDetail.guide[localeKey],
              }}
              onClick={handleImageClick}
            />
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogContent className="sm:max-w-400 sm:min-h-225 bg-transparent border-none shadow-none">
                <DialogHeader>
                  <DialogTitle />
                  <DialogDescription>
                    <div
                      onWheel={handleWheel}
                      onMouseDown={handleMouseDown}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                      onMouseLeave={handleMouseLeave}
                      className="w-full h-200 flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing select-none"
                    >
                      <img
                        src={selectedImage}
                        alt="selected"
                        draggable={false}
                        style={{
                          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                          transition: isDragging
                            ? "none"
                            : "transform 0.1s ease",
                          transformOrigin: "center center",
                          maxWidth: "100%",
                          maxHeight: "100%",
                          userSelect: "none",
                          pointerEvents: "none", // 드래그 이벤트 방해 방지
                        }}
                      />
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
