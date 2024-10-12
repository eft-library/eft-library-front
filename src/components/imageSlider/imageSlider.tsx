"use client";

import Slider from "react-slick";
import { Image, Box } from "@chakra-ui/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { formatImage } from "@/lib/formatImage";
import type { ImageSlider } from "@/types/types";
import ImageZoom from "../imageZoom/imageZoom";
import { Gallery } from "react-photoswipe-gallery";
import React from "react";
import { useWindowSize } from "@/hooks/useWindowSize";
import Link from "next/link";

export default function ImageSlider({
  mapList,
  imagePath,
  sliderOption,
  useZoom,
}: ImageSlider) {
  const size = useWindowSize();
  return (
    <Box
      w={"100%"}
      h={"100%"}
      display={"flex"}
      justifyContent={"center"}
      mb={"40px"}
      mt={"40px"}
    >
      <Box w={"95%"} h={"30%"}>
        <Gallery>
          <Slider {...sliderOption}>
            {mapList.map((map) =>
              useZoom ? (
                <ImageZoom
                  key={map.id}
                  needFormat
                  isMax={false}
                  isLoop
                  originalImg={map[imagePath]}
                  thumbnail={map[imagePath]}
                />
              ) : (
                <Link href={`/map-of-tarkov/${map.id}`} key={map.id}>
                  <Image
                    w={size.width}
                    h={size.height}
                    cursor={"pointer"}
                    alt={map.id}
                    src={formatImage(map[imagePath])}
                    boxSize="100%"
                  />
                </Link>
              )
            )}
          </Slider>
        </Gallery>
      </Box>
    </Box>
  );
}
