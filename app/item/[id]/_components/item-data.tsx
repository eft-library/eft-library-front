"use client";

import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { useParams } from "next/navigation";
import Loading from "@/components/custom/Loading/loading";
import { ItemDetail } from "./item.types";
import ItemView from "./item-view";
import { useQuery } from "@tanstack/react-query";

export default function ItemData() {
  const { id } = useParams<{ id: string }>();
  const fetchItemData = async (id: string): Promise<ItemDetail> => {
    const res = await fetch(`${API_ENDPOINTS.GET_ITEM_DETAIL}/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch item data");
    }
    const json = await res.json();

    if (json.status !== 200) {
      throw new Error(json.msg || "Unknown error");
    }

    return json.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["itemData", id],
    queryFn: () => fetchItemData(id),
    enabled: !!id,
  });

  if (isLoading) return <Loading />;

  if (error) {
    console.error(error);
    return <div>데이터를 불러오는 데 실패했습니다.</div>;
  }

  if (!data) return <div>데이터가 없습니다.</div>;

  return <ItemView itemInfo={data} />;
}
