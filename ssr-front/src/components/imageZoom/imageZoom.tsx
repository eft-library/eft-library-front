"use client";

import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import { Img } from "@chakra-ui/react";
import { formatImage } from "@/lib/formatImage";
import type { ImageZoom } from "@/types/types";
import { useEffect, useState } from "react";
import Image from "next/image";

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
            ref={ref}
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
            onClick={open}
            width={isMax ? imageSize.width : 1440}
            height={isMax ? imageSize.height : 801.06}
            placeholder="blur"
            style={{
              maxHeight: isMax ? "300px" : "",
              cursor: "pointer",
            }}
            priority
            src={needFormat ? formatImage(imgPath) : imgPath}
            alt="image"
          />
        )}
      </Item>
    </Gallery>
  );
}
