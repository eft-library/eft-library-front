"use client";

import Slider from "react-slick";
import { Box, Image } from "@chakra-ui/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "photoswipe/dist/photoswipe.css";
import { Gallery, Item } from "react-photoswipe-gallery";
import { formatImage } from "@/lib/formatImage";

interface SliderOption {
  [key: string]: any;
}

interface ImageSliderProps {
  mapList: any[];
  imagePath: string;
  sliderOption: SliderOption;
  useZoom: boolean;
}

export default function ImageSlider({
  mapList,
  imagePath,
  sliderOption,
  useZoom,
}: ImageSliderProps) {
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
                <Gallery>
                  <Item
                    original={formatImage(map[imagePath])}
                    thumbnail={formatImage(map[imagePath])}
                    width="1440"
                    height="810.06"
                  >
                    {({ ref, open }) => (
                      <Image
                        ref={ref}
                        onClick={open}
                        src={formatImage(map[imagePath])}
                        boxSize="100%"
                        cursor="pointer"
                        alt="image"
                      />
                    )}
                  </Item>
                </Gallery>
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
