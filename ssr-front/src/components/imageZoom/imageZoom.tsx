"use client";

import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import { Image } from "@chakra-ui/react";
import { formatImage } from "@/lib/formatImage";
import type { ImageZoom } from "@/types/types";
import { useEffect, useState } from "react";

export default function ImageZoom({
  imgPath,
  needFormat = false,
  isMax = true,
}: ImageZoom) {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const imagePath = needFormat ? formatImage(imgPath) : imgPath;

    const img = new window.Image();
    img.src = imagePath;
    img.onload = () => {
      setImageSize({ width: img.naturalWidth, height: img.naturalHeight });
    };
  }, [imgPath, needFormat]);

  return (
    <Gallery>
      <Item
        original={needFormat ? formatImage(imgPath) : imgPath}
        thumbnail={needFormat ? formatImage(imgPath) : imgPath}
        width={isMax ? imageSize.width : 1440}
        height={isMax ? imageSize.height : 801.06}
      >
        {({ ref, open }) => (
          <Image
            maxH={isMax ? "300px" : ""}
            ref={ref}
            onClick={open}
            src={needFormat ? formatImage(imgPath) : imgPath}
            boxSize="100%"
            cursor="pointer"
            alt="image"
          />
        )}
      </Item>
    </Gallery>
  );
}
