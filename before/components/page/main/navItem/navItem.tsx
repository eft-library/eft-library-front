"use server";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import NavItemClient from "./navItemClient";

export default async function NavItem() {
  const data = await requestData(API_ENDPOINTS.GET_MENU_INFO);

  if (!data || data.status !== 200) {
    console.error(
      "Failed to fetch navItem data:",
      data?.msg || "Unknown error"
    );
    return null;
  }

  return <NavItemClient navItemList={data.data} />;
}
