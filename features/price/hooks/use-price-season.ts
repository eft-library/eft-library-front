"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiGet } from "@/lib/api/api-client";
import { priceSeasonsEndpoint } from "@/lib/config/api-endpoints";
import type { PriceSeason } from "@/types/api/price";

export function usePriceSeason() {
  const [selection, setSeasonId] = useState<string>();
  const query = useQuery({
    queryKey: ["price-seasons"],
    queryFn: () => apiGet<PriceSeason[]>(priceSeasonsEndpoint),
    staleTime: 5 * 60 * 1000,
  });
  const seasonId =
    selection ?? query.data?.find((season) => season.is_current)?.id;
  return { ...query, seasonId, setSeasonId };
}
