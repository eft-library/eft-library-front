"use client";

import { formatImage } from "@/lib/func/formatImage";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "photoswipe/dist/photoswipe.css";
import { Gallery } from "react-photoswipe-gallery";

interface ThreeItemPath {
  boxArgs: number[];
  position: number[];
  childValue: string;
}

interface JpgItemPath {
  x: number;
  y: number;
  childValue: string;
  motherValue: string;
}

interface MapJson {
  geometry: string;
  material: string;
}

interface SubItem {
  name_kr: string;
  id: string;
  three_item_path: ThreeItemPath[];
  jpg_image: string;
  depth: number;
  link: string;
  main_image: string;
  map_json: MapJson[];
  three_image: string;
  name_en: string;
  jpg_item_path: JpgItemPath[];
  order: number;
  parent_value: string;
  mot_image: string;
  update_time: string;
}

interface MapData {
  name_en: string;
  three_image: string;
  three_item_path: ThreeItemPath[];
  jpg_item_path: JpgItemPath[];
  order: number;
  main_image: string;
  map_json: MapJson[];
  id: string;
  name_kr: string;
  jpg_image: string;
  depth: number;
  link: string;
  mot_image: string;
  update_time: string;
  sub: SubItem[];
}

interface MapSlider {
  mapList: MapData[];
}

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
