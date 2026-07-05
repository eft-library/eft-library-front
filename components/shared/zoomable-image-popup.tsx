"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut } from "lucide-react";

export interface ZoomableImagePopupImage {
  alt: string;
  src: string;
}

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.25;

function clampZoom(value: number) {
  return Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Number(value.toFixed(2))));
}

function clampRatio(value: number) {
  return Math.min(1, Math.max(0, value));
}

export function ZoomableImagePopup({
  image,
  images,
  currentIndex,
  onClose,
  onNavigate,
}: {
  image: ZoomableImagePopupImage | null;
  images?: ZoomableImagePopupImage[];
  currentIndex?: number;
  onClose: () => void;
  onNavigate?: (index: number) => void;
}) {
  const imageRef = useRef<HTMLImageElement | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const dragStateRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    scrollLeft: number;
    scrollTop: number;
  } | null>(null);
  const zoomAnchorRef = useRef<{
    clientX: number;
    clientY: number;
    ratioX: number;
    ratioY: number;
  } | null>(null);
  const [zoom, setZoom] = useState(0.75);
  const [isDragging, setIsDragging] = useState(false);
  const hasNavigation = !!images && images.length > 1 && typeof currentIndex === "number" && !!onNavigate;
  const previousIndex = hasNavigation
    ? (currentIndex - 1 + images.length) % images.length
    : -1;
  const nextIndex = hasNavigation ? (currentIndex + 1) % images.length : -1;
  const contentWidth = `${Math.max(100, zoom * 100)}%`;
  const imageWidth = `${zoom >= 1 ? 100 : zoom * 100}%`;

  useEffect(() => {
    if (!image) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (hasNavigation && event.key === "ArrowLeft") {
        event.preventDefault();
        onNavigate(previousIndex);
      }

      if (hasNavigation && event.key === "ArrowRight") {
        event.preventDefault();
        onNavigate(nextIndex);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [hasNavigation, image, nextIndex, onClose, onNavigate, previousIndex]);

  useEffect(() => {
    setZoom(0.75);
    setIsDragging(false);
    zoomAnchorRef.current = null;
  }, [image?.src]);

  useLayoutEffect(() => {
    const anchor = zoomAnchorRef.current;
    const scroller = scrollerRef.current;
    const imageElement = imageRef.current;

    if (!anchor || !scroller || !imageElement) {
      return;
    }

    zoomAnchorRef.current = null;

    const imageRect = imageElement.getBoundingClientRect();
    const desiredLeft = anchor.clientX - imageRect.width * anchor.ratioX;
    const desiredTop = anchor.clientY - imageRect.height * anchor.ratioY;

    scroller.scrollLeft += imageRect.left - desiredLeft;
    scroller.scrollTop += imageRect.top - desiredTop;
  }, [zoom]);

  if (!image) {
    return null;
  }

  const setZoomPreservingPoint = (
    nextZoom: number,
    anchor?: { clientX: number; clientY: number },
  ) => {
    const scroller = scrollerRef.current;
    const imageElement = imageRef.current;

    if (!scroller || !imageElement) {
      setZoom(nextZoom);
      return;
    }

    const scrollerRect = scroller.getBoundingClientRect();
    const imageRect = imageElement.getBoundingClientRect();
    const clientX = anchor?.clientX ?? scrollerRect.left + scrollerRect.width / 2;
    const clientY = anchor?.clientY ?? scrollerRect.top + scrollerRect.height / 2;
    const ratioX = imageRect.width > 0 ? clampRatio((clientX - imageRect.left) / imageRect.width) : 0.5;
    const ratioY = imageRect.height > 0 ? clampRatio((clientY - imageRect.top) / imageRect.height) : 0.5;

    zoomAnchorRef.current = {
      clientX,
      clientY,
      ratioX,
      ratioY,
    };

    setZoom(nextZoom);
  };

  const zoomOut = () => setZoomPreservingPoint(clampZoom(zoom - ZOOM_STEP));
  const zoomIn = () => setZoomPreservingPoint(clampZoom(zoom + ZOOM_STEP));

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    const nextZoom = clampZoom(zoom + (event.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP));

    if (nextZoom !== zoom) {
      setZoomPreservingPoint(nextZoom, {
        clientX: event.clientX,
        clientY: event.clientY,
      });
    }
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) {
      return;
    }

    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    dragStateRef.current = {
      pointerId: event.pointerId,
      scrollLeft: scroller.scrollLeft,
      scrollTop: scroller.scrollTop,
      startX: event.clientX,
      startY: event.clientY,
    };
    setIsDragging(true);
    scroller.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const dragState = dragStateRef.current;
    const scroller = scrollerRef.current;

    if (!dragState || !scroller || dragState.pointerId !== event.pointerId) {
      return;
    }

    event.preventDefault();
    scroller.scrollLeft = dragState.scrollLeft - (event.clientX - dragState.startX);
    scroller.scrollTop = dragState.scrollTop - (event.clientY - dragState.startY);
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const scroller = scrollerRef.current;
    const dragState = dragStateRef.current;

    if (scroller && dragState?.pointerId === event.pointerId) {
      scroller.releasePointerCapture(event.pointerId);
    }

    dragStateRef.current = null;
    setIsDragging(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-x-0 bottom-0 top-14 z-[2000] flex items-center justify-center bg-black/80 p-4"
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
            disabled={zoom <= MIN_ZOOM}
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
            disabled={zoom >= MAX_ZOOM}
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
        {hasNavigation ? (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => onNavigate(previousIndex)}
              className="absolute left-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-orange-500"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={() => onNavigate(nextIndex)}
              className="absolute right-3 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-orange-500"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <div className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-black/70 px-3 py-1 text-xs font-bold text-white">
              {currentIndex + 1} / {images.length}
            </div>
          </>
        ) : null}
        <div
          ref={scrollerRef}
          className={`h-full w-full overflow-auto p-12 ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
          onWheel={handleWheel}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={(event) => {
            if (dragStateRef.current?.pointerId === event.pointerId) {
              endDrag(event);
            }
          }}
        >
          <div
            className="flex min-h-full items-center justify-center"
            style={{ width: contentWidth }}
          >
            <img
              ref={imageRef}
              src={image.src}
              alt={image.alt}
              className="h-auto max-w-none select-none object-contain"
              draggable={false}
              style={{ width: imageWidth }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
