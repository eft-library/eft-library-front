import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getMsUntilNext20 } from "@/lib/func/formatTime";
import { useEffect } from "react";
import { API_ENDPOINTS } from "@/lib/config/endpoint";

const getRngItemList = async () => {
  const response = await fetch(API_ENDPOINTS.GET_RNG_ITEM_MINIGAME);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const useRngItemList = () => {
  return useQuery({
    queryKey: ["rng-item-list"],
    queryFn: getRngItemList,
    staleTime: getMsUntilNext20(),
    refetchOnWindowFocus: false,
  });
};

export const useInvalidateRngItemsAt20 = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const timeout = setTimeout(() => {
      queryClient.invalidateQueries({
        queryKey: ["rng-item-list"],
      });
    }, getMsUntilNext20());

    return () => clearTimeout(timeout);
  }, [queryClient]);
};
