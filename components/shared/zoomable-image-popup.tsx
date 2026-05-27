"use client";

import { useEffect, useRef, useState } from "react";
import { X, ZoomIn, ZoomOut } from "lucide-react";

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

export function ZoomableImagePopup({
  image,
  onClose,
}: {
  image: ZoomableImagePopupImage | null;
  onClose: () => void;
}) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const dragStateRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    scrollLeft: number;
    scrollTop: number;
  } | null>(null);
  const [zoom, setZoom] = useState(0.75);
  const [isDragging, setIsDragging] = useState(false);

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
    setIsDragging(false);
  }, [image?.src]);

  if (!image) {
    return null;
  }

  const setZoomPreservingPoint = (
    nextZoom: number,
    anchor?: { clientX: number; clientY: number },
  ) => {
    const scroller = scrollerRef.current;

    if (!scroller) {
      setZoom(nextZoom);
      return;
    }

    const rect = scroller.getBoundingClientRect();
    const anchorX = anchor ? anchor.clientX - rect.left : rect.width / 2;
    const anchorY = anchor ? anchor.clientY - rect.top : rect.height / 2;
    const contentX = scroller.scrollLeft + anchorX;
    const contentY = scroller.scrollTop + anchorY;
    const ratioX = scroller.scrollWidth > 0 ? contentX / scroller.scrollWidth : 0.5;
    const ratioY = scroller.scrollHeight > 0 ? contentY / scroller.scrollHeight : 0.5;

    setZoom(nextZoom);

    window.requestAnimationFrame(() => {
      scroller.scrollLeft = Math.max(0, ratioX * scroller.scrollWidth - anchorX);
      scroller.scrollTop = Math.max(0, ratioY * scroller.scrollHeight - anchorY);
    });
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
      className="fixed inset-x-0 bottom-0 top-14 z-[80] flex items-center justify-center bg-black/80 p-4"
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
          <div className="flex min-h-full min-w-full items-center justify-center">
            <img
              src={image.src}
              alt={image.alt}
              className="h-auto max-w-none select-none object-contain"
              draggable={false}
              style={{ width: `${zoom * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
