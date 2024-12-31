"use server";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import SearchClient from "./searchClient";

export default async function Search() {
  const data = await requestData(API_ENDPOINTS.GET_SEARCH);

  if (!data || data.status !== 200) {
    console.error("Failed to fetch search data:", data?.msg || "Unknown error");
    return null;
  }

  return <SearchClient searchList={data.data} />;
}
