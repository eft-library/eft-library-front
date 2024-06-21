"use client";

import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import { formatImage } from "@/lib/formatImage";
import type { ImageZoom } from "@/types/types";
import { useEffect, useState } from "react";
import { Image } from "@chakra-ui/react";

export default function ImageZoom({
  originalImg,
  thumbnail,
  needFormat = false,
  isMax = true,
  isLoop = false,
}: ImageZoom) {
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const imagePath = needFormat ? formatImage(originalImg) : originalImg;
    const img = new window.Image();
    img.src = imagePath;
    img.onload = () => {
      setImageSize({ width: img.naturalWidth, height: img.naturalHeight });
    };
  }, [originalImg, needFormat]);

  if (isLoop)
    return (
      <Item
        original={needFormat ? formatImage(originalImg) : originalImg}
        thumbnail={needFormat ? formatImage(thumbnail) : thumbnail}
        width={isMax ? imageSize.width : 1440}
        height={isMax ? imageSize.height : 801.06}
      >
        {({ ref, open }) => (
          <Image
            ref={ref}
            onClick={open}
            maxH={isMax ? "200px" : ""}
            fallbackSrc="/loading.gif"
            cursor={"pointer"}
            src={needFormat ? formatImage(originalImg) : originalImg}
            alt="image"
          />
        )}
      </Item>
    );

  return (
    <Gallery>
      <Item
        original={needFormat ? formatImage(originalImg) : originalImg}
        thumbnail={needFormat ? formatImage(thumbnail) : thumbnail}
        width={isMax ? imageSize.width : 1440}
        height={isMax ? imageSize.height : 801.06}
      >
        {({ ref, open }) => (
          <Image
            ref={ref}
            onClick={open}
            maxH={isMax ? "200px" : ""}
            fallbackSrc="/loading.gif"
            cursor={"pointer"}
            src={needFormat ? formatImage(originalImg) : originalImg}
            alt="image"
          />
        )}
      </Item>
    </Gallery>
  );
}
