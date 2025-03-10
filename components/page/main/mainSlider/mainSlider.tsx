"use server";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import MainSliderClient from "./mainSliderClient";

export default async function MainSlider() {
  const data = await requestData(API_ENDPOINTS.GET_ALL_SLIDE);

  if (!data || data.status !== 200) {
    console.error("Failed to fetch slide data:", data?.msg || "Unknown error");
    return null;
  }

  return <MainSliderClient sliderList={data.data} />;
}
