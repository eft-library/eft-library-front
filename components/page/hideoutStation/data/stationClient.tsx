"use client";

import type { StationClient } from "./stationType";

export default function StationClient({ hideoutList }: StationClient) {
  return <div>{JSON.stringify(hideoutList)}</div>;
}
