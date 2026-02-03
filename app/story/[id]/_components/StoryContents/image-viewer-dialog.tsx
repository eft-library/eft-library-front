"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useEffect, useRef, useState } from "react";
import { ImageViewerDialogTypes } from "../story-types";

export default function ImageViewerDialog({
  src,
  onClose,
}: ImageViewerDialogTypes) {
  const imgRef = useRef<HTMLImageElement | null>(null);

  const scaleRef = useRef(1);
  const positionRef = useRef({ x: 0, y: 0 });
  const draggingRef = useRef(false);
  const lastPosRef = useRef({ x: 0, y: 0 });

  const [, forceRender] = useState(0); // scale 변경 시 최소 렌더 트리거

  /** transform 적용 */
  const applyTransform = () => {
    if (!imgRef.current) return;
    imgRef.current.style.transform = `
      translate(${positionRef.current.x}px, ${positionRef.current.y}px)
      scale(${scaleRef.current})
    `;
  };

  /** 이미지 열릴 때 초기화 */
  useEffect(() => {
    if (!src) return;
    scaleRef.current = 1;
    positionRef.current = { x: 0, y: 0 };
    requestAnimationFrame(applyTransform);
  }, [src]);

  /** 휠 줌 */
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();

    const nextScale = Math.min(
      Math.max(scaleRef.current - e.deltaY * 0.001, 0.5),
      3,
    );

    if (nextScale === scaleRef.current) return;

    scaleRef.current = nextScale;
    requestAnimationFrame(applyTransform);
    forceRender((v) => v + 1); // cursor 상태 갱신용
  };

  /** 드래그 시작 */
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scaleRef.current <= 1) return;
    draggingRef.current = true;
    lastPosRef.current = { x: e.clientX, y: e.clientY };
  };

  /** 드래그 중 */
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!draggingRef.current) return;

    positionRef.current.x += e.clientX - lastPosRef.current.x;
    positionRef.current.y += e.clientY - lastPosRef.current.y;
    lastPosRef.current = { x: e.clientX, y: e.clientY };

    requestAnimationFrame(applyTransform);
  };

  /** 드래그 종료 */
  const stopDragging = () => {
    draggingRef.current = false;
  };

  return (
    <Dialog open={!!src} onOpenChange={onClose}>
      <DialogTitle />
      <DialogContent className="sm:max-w-400 sm:min-h-225 bg-transparent border-none shadow-none">
        <div
          className="w-full h-200 flex items-center justify-center overflow-hidden
                     select-none cursor-grab active:cursor-grabbing"
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={stopDragging}
          onMouseLeave={stopDragging}
        >
          {src && (
            <img
              ref={imgRef}
              src={src}
              alt=""
              draggable={false}
              className="max-w-full max-h-full pointer-events-none select-none"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
