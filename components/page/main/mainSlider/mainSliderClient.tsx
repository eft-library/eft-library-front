"use client";

import { formatImage } from "@/lib/func/formatImage";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "photoswipe/dist/photoswipe.css";
import { Gallery } from "react-photoswipe-gallery";
import type { MainSlider } from "../mainTypes";
import { MAIN_IMAGE_SLIDER_OPTION } from "@/lib/consts/libraryConsts";

export default function MainSliderClient({ sliderList }: MainSlider) {
  return (
    <div className="w-full h-full flex justify-center">
      <div className="w-[85%] h-[20%]">
        <Gallery>
          <Slider {...MAIN_IMAGE_SLIDER_OPTION}>
            {sliderList.map((sliderImg) => (
              <Link
                href={`${sliderImg.link}`}
                className="cursor-pointer flex items-center justify-center w-full"
                key={sliderImg.value}
              >
                <Image
                  src={formatImage(sliderImg.main_image)}
                  alt={sliderImg.kr_name}
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
