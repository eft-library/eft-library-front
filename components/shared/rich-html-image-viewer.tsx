"use client";

import { useState } from "react";

import { cn } from "@/lib/utils/class-name";
import { ZoomableImagePopup } from "@/components/shared/zoomable-image-popup";

interface ImagePopupState {
  src: string;
  alt: string;
}

interface RichHtmlImageViewerProps {
  html: string;
  imageAltFallback: string;
  className?: string;
}

export function RichHtmlImageViewer({
  html,
  imageAltFallback,
  className,
}: RichHtmlImageViewerProps) {
  const [imagePopup, setImagePopup] = useState<ImagePopupState | null>(null);

  return (
    <>
      <div
        className={cn("rich-html-content [&_img]:cursor-zoom-in", className)}
        onClick={(event) => {
          const target = event.target;

          if (!(target instanceof HTMLImageElement)) {
            return;
          }

          event.preventDefault();
          setImagePopup({
            src: target.currentSrc || target.src,
            alt: target.alt || imageAltFallback,
          });
        }}
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <ZoomableImagePopup image={imagePopup} onClose={() => setImagePopup(null)} />
    </>
  );
}
