"use client";

import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import "../../assets/editor.css";

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
        className="ql-editor font-bold text-base"
        dangerouslySetInnerHTML={{ __html: contents }}
        onClick={handleImageClick}
      />
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[1600px] sm:min-h-[900px] border-white bg-black">
          <DialogHeader>
            <DialogTitle />
            <DialogDescription>
              <Image
                src={selectedImage}
                alt={selectedImage}
                fill
                sizes="1200px"
              />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
