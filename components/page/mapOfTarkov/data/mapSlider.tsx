"use client";

import { Separator } from "@/components/ui/separator";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { formatImage } from "@/lib/func/formatImage";
import Image from "next/image";
import TextSpan from "../../../custom/gridContents/textSpan";

interface Map {
  sub: SubMap[];
  id: string;
  name_en: string;
  three_image: string;
  jpg_image: string;
  depth: number;
  link: string;
  name_kr: string;
  mot_image: string;
  order: number;
  main_image: string;
}
interface SubMap {
  id: string;
  name_en: string;
  three_image: string;
  jpg_image: string;
  depth: number;
  link: string;
  name_kr: string;
  mot_image: string;
  order: number;
  main_image: string;
  parent_value: string;
}

interface MapSlider {
  mapInfo: Map;
}

export default function MapSlider({ mapInfo }: MapSlider) {
  const MOT_IMAGE_SLIDER_OPTION = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    draggable: false,
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <TextSpan isCenter={false} size="3xl">
        {mapInfo.name_kr}
      </TextSpan>
      <Separator className="bg-white" />
      <Gallery>
        <Slider {...MOT_IMAGE_SLIDER_OPTION}>
          {mapInfo.sub.map((map) => (
            <Item
              key={map.id}
              original={formatImage(map.mot_image)}
              width="1600"
              height="900"
            >
              {({ ref, open }) => (
                <div
                  ref={ref}
                  onClick={open}
                  className={"flex justify-center items-center cursor-pointer"}
                >
                  <Image
                    src={formatImage(map.mot_image)}
                    alt={map.name_en}
                    width={1100}
                    height={400}
                    style={{ width: "auto", height: "auto" }}
                    priority
                  />
                </div>
              )}
            </Item>
          ))}
        </Slider>
      </Gallery>
    </div>
  );
}
