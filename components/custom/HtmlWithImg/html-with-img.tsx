/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { HtmlWithImageTypes } from "./html-with-img.types";

export default function HtmlWithImage({ contents }: HtmlWithImageTypes) {
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
    <div>
      <div
        className="quest-editor font-semibold text-sm"
        dangerouslySetInnerHTML={{ __html: contents }}
        onClick={handleImageClick}
      />
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[1600px] sm:min-h-[900px] bg-transparent border-none shadow-none">
          <DialogHeader>
            <DialogTitle />
            <DialogDescription>
              <div
                onWheel={handleWheel}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                className="w-full h-[800px] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing select-none"
              >
                <img
                  src={selectedImage}
                  alt="selected"
                  draggable={false}
                  style={{
                    transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                    transition: isDragging ? "none" : "transform 0.1s ease",
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
    </div>
  );
}
