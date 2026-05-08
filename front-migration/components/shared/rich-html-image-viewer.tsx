"use client";

import { useEffect, useState } from "react";
import { X, ZoomIn, ZoomOut } from "lucide-react";

import { cn } from "@/lib/utils/class-name";

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

      <ImagePopup image={imagePopup} onClose={() => setImagePopup(null)} />
    </>
  );
}

function ImagePopup({
  image,
  onClose,
}: {
  image: ImagePopupState | null;
  onClose: () => void;
}) {
  const [zoom, setZoom] = useState(0.75);

  useEffect(() => {
    if (!image) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [image, onClose]);

  useEffect(() => {
    setZoom(0.75);
  }, [image?.src]);

  if (!image) {
    return null;
  }

  const zoomOut = () =>
    setZoom((value) => Math.max(0.5, Number((value - 0.25).toFixed(2))));
  const zoomIn = () =>
    setZoom((value) => Math.min(3, Number((value + 0.25).toFixed(2))));

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-x-0 bottom-0 top-14 z-20 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div
        className="relative flex h-full w-full max-w-[88vw] flex-col overflow-hidden rounded-lg bg-black/50 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="absolute left-3 top-3 z-10 flex items-center gap-2 rounded-full bg-black/70 p-1 text-white">
          <button
            type="button"
            aria-label="Zoom out"
            onClick={zoomOut}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-white/15 disabled:opacity-40"
            disabled={zoom <= 0.5}
          >
            <ZoomOut className="h-5 w-5" />
          </button>
          <span className="min-w-12 text-center text-xs font-bold">
            {Math.round(zoom * 100)}%
          </span>
          <button
            type="button"
            aria-label="Zoom in"
            onClick={zoomIn}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-white/15 disabled:opacity-40"
            disabled={zoom >= 3}
          >
            <ZoomIn className="h-5 w-5" />
          </button>
        </div>
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-orange-500"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="h-full w-full overflow-auto p-12">
          <div className="flex min-h-full min-w-full items-center justify-center">
            <img
              src={image.src}
              alt={image.alt}
              className="h-auto max-w-none object-contain"
              style={{ width: `${zoom * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
