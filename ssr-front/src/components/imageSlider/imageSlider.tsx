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

export default function ImageSlider({
  mapList,
  imagePath,
  sliderOption,
  useZoom,
}: ImageSlider) {
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
                <Image
                  key={map.id}
                  alt="image"
                  src={formatImage(map[imagePath])}
                  boxSize="100%"
                />
              )
            )}
          </Slider>
        </Gallery>
      </Box>
    </Box>
  );
}
