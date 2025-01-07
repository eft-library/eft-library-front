"use client";

import { formatImage } from "@/lib/func/formatImage";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "photoswipe/dist/photoswipe.css";
import { Gallery } from "react-photoswipe-gallery";
import type { MapSlider } from "../mainTypes";

export default function MapSliderClient({ mapList }: MapSlider) {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    draggable: false,
  };

  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-[85%] h-[20%]">
        <Gallery>
          <Slider {...settings}>
            {mapList.map((mapImg) => (
              <Link
                href={`/map-of-tarkov/${mapImg.id}`}
                className="cursor-pointer"
                key={mapImg.id}
              >
                <Image
                  src={formatImage(mapImg.main_image)}
                  alt={mapImg.name_en}
                  width={1100}
                  height={400}
                  style={{ width: "auto", height: "auto" }}
                  priority
                />
              </Link>
            ))}
          </Slider>
        </Gallery>
      </div>
    </div>
  );
}
