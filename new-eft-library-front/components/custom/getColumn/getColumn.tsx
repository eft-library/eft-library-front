"use server";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import GetColumnClient from "./getColumnClient";

interface GetColumn {
  columnKey: string;
  isWeapon?: boolean;
  isAmmo?: boolean;
  isExtraction?: boolean;
  isHideout?: boolean;
  isNote?: boolean;
  isQuest?: boolean;
  columnDesign: number;
}

export default async function GetColumn({
  columnKey,
  columnDesign,
  isWeapon = false,
  isAmmo = false,
  isExtraction = false,
  isHideout = false,
  isNote = false,
  isQuest = false,
}: GetColumn) {
  const data = await requestData(`${API_ENDPOINTS.GET_COLUMN}/${columnKey}`);

  if (!data || data.status !== 200) {
    console.error("Failed to fetch column data:", data?.msg || "Unknown error");
    return null;
  }

  return (
    <GetColumnClient
      column={data.data}
      columnDesign={columnDesign}
      isAmmo={isAmmo}
      isWeapon={isWeapon}
      isExtraction={isExtraction}
      isNote={isNote}
      isHideout={isHideout}
      isQuest={isQuest}
    />
  );
}
