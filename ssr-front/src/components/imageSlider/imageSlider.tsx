"use client";

import Slider from "react-slick";
import { Box, Image } from "@chakra-ui/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { formatImage } from "@/lib/formatImage";
import type { ImageSlider } from "@/types/types";
import ImageZoom from "../imageZoom/imageZoom";

export default function ImageSlider({
  mapList,
  imagePath,
  sliderOption,
  useZoom,
}: ImageSlider) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        marginBottom: "40px",
        marginTop: "40px",
      }}
    >
      <div
        style={{
          width: "95%",
          height: "30%",
        }}
      >
        <Slider {...sliderOption}>
          {mapList.map((map, index) => (
            <Box boxSize="sm" key={index} height={"100%"}>
              {useZoom ? (
                <ImageZoom
                  needFormat
                  isMax={false}
                  originalImg={map[imagePath]}
                  thumbnail={map[imagePath]}
                />
              ) : (
                <Image
                  alt="image"
                  src={formatImage(map[imagePath])}
                  boxSize="100%"
                />
              )}
            </Box>
          ))}
        </Slider>
      </div>
    </div>
  );
}
