"use client";

import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import { formatImage } from "@/lib/formatImage";
import type { ImageZoom } from "@/types/types";
import { useEffect, useState } from "react";
import { Image } from "@chakra-ui/react";
import { extractFileName } from "@/lib/extractFileName";

export default function ImageZoom({
  originalImg,
  thumbnail,
  needFormat = false,
  isMax = true,
  isLoop = false,
  isHideout = false,
  isBoss = false,
  isQuest = false,
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

  const returnMaxH = () => {
    if (isHideout) {
      return 20;
    } else if (isQuest) {
      return 10;
    } else if (isBoss) {
      return 640;
    } else if (isMax) {
      return 110;
    } else {
      return "";
    }
  };

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
            maxH={returnMaxH()}
            height={returnMaxH()}
            fallbackSrc="/loading.gif"
            cursor={"pointer"}
            src={needFormat ? formatImage(originalImg) : originalImg}
            alt={extractFileName(originalImg)}
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
            maxH={returnMaxH()}
            height={returnMaxH()}
            fallbackSrc="/loading.gif"
            borderRadius={isQuest ? "lg" : ""}
            cursor={"pointer"}
            src={needFormat ? formatImage(originalImg) : originalImg}
            alt={extractFileName(originalImg)}
          />
        )}
      </Item>
    </Gallery>
  );
}
