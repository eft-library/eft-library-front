"use client";

import { MAIN_IMAGE_SLIDER_OPTION } from "@/util/consts/libraryConsts";
import API_ENDPOINTS from "@/config/endPoints";
import type { SubMenu } from "@/types/types";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import SliderSkeleton from "./skeleton/sliderSkeleton";
import dynamic from "next/dynamic";

const ImageSlider = dynamic(
  () => import("@/components/imageSlider/imageSlider"),
  { ssr: false }
);

export default function Slider() {
  const [slider, setSlider] = useState<SubMenu[]>();

  useEffect(() => {
    fetchDataWithNone(`${API_ENDPOINTS.GET_ALL_MAP}`, setSlider);
  }, []);

  if (!slider) return <SliderSkeleton />;

  return (
    <ImageSlider
      mapList={slider}
      imagePath="main_image"
      sliderOption={MAIN_IMAGE_SLIDER_OPTION}
      useZoom={false}
    />
  );
}
