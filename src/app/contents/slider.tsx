"use client";

import { MAIN_IMAGE_SLIDER_OPTION } from "@/util/consts/libraryConsts";
import ImageSlider from "@/components/imageSlider/imageSlider";
import API_ENDPOINTS from "@/config/endPoints";
import type { SubMenu } from "@/types/types";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";

export default function Slider() {
  const [slider, setSlider] = useState<SubMenu[]>();

  useEffect(() => {
    fetchDataWithNone(`${API_ENDPOINTS.GET_ALL_MAP}`, setSlider);
  }, []);

  return (
    <ImageSlider
      mapList={slider}
      imagePath="main_image"
      sliderOption={MAIN_IMAGE_SLIDER_OPTION}
      useZoom={false}
    />
  );
}
