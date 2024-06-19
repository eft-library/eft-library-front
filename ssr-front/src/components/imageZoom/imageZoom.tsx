"use client";

import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import { formatImage } from "@/lib/formatImage";
import type { ImageZoom } from "@/types/types";
import { useEffect, useState } from "react";
// import Image from "next/image";
import { Image } from "@chakra-ui/react";

export default function ImageZoom({
  originalImg,
  thumbnail,
  needFormat = false,
  isMax = true,
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
            // blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
            onClick={open}
            // w={isMax ? imageSize.width : 1440}
            // h={isMax ? imageSize.height : 801.06}
            // placeholder="blur"
            maxH={isMax ? "200px" : ""}
            fallbackSrc="/loading.jpg"
            cursor={"pointer"}
            // style={{
            //   maxHeight: isMax ? "200px" : "",
            //   cursor: "pointer",
            // }}
            // priority
            src={needFormat ? formatImage(originalImg) : originalImg}
            alt="image"
          />
        )}
      </Item>
    </Gallery>
  );
}
