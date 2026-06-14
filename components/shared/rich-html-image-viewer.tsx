"use client";

import { useState } from "react";

import { cn } from "@/lib/utils/class-name";
import { ZoomableImagePopup } from "@/components/shared/zoomable-image-popup";

interface ImagePopupState {
  src: string;
  alt: string;
  images?: Array<{ src: string; alt: string }>;
  index?: number;
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
  const navigateImagePopup = (index: number) => {
    setImagePopup((current) => {
      const image = current?.images?.[index];

      return image ? { ...image, images: current?.images, index } : current;
    });
  };

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
          const images = Array.from(event.currentTarget.querySelectorAll("img"))
            .map((image) => ({
              src: image.currentSrc || image.src,
              alt: image.alt || imageAltFallback,
            }))
            .filter((image) => image.src);
          const src = target.currentSrc || target.src;
          const index = images.findIndex((image) => image.src === src);

          setImagePopup({
            src,
            alt: target.alt || imageAltFallback,
            images: images.length > 0 ? images : undefined,
            index: index >= 0 ? index : undefined,
          });
        }}
        dangerouslySetInnerHTML={{ __html: html }}
      />

      <ZoomableImagePopup
        currentIndex={imagePopup?.index}
        image={imagePopup}
        images={imagePopup?.images}
        onClose={() => setImagePopup(null)}
        onNavigate={navigateImagePopup}
      />
    </>
  );
}
