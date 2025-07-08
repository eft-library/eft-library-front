/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface HtmlWithImage {
  contents: string;
}

export default function HtmlWithImage({ contents }: HtmlWithImage) {
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  const handleImageClick = (event: React.MouseEvent<HTMLImageElement>) => {
    const img = event.target as HTMLImageElement;
    if (img.tagName === "IMG") {
      setSelectedImage(img.src);
      setIsOpen(true);
    }
  };

  return (
    <div>
      <div
        className="quest-editor font-bold text-lg"
        dangerouslySetInnerHTML={{ __html: contents }}
        onClick={handleImageClick}
      />
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[1600px] sm:min-h-[900px] border-white bg-Background">
          <DialogHeader>
            <DialogTitle />
            <DialogDescription>
              <img src={selectedImage} alt={selectedImage} />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
