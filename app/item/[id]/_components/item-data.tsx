"use client";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "@/components/custom/Loading/loading";
import { ItemDetail } from "./item.types";
import ItemView from "./item-view";

export default function ItemData() {
  const [itemInfo, setItemInfo] = useState<ItemDetail>();
  const param = useParams<{ id: string }>();

  useEffect(() => {
    const getItemById = async () => {
      const data = await requestData(
        `${API_ENDPOINTS.GET_ITEM_DETAIL}/${param.id}`
      );
      if (!data || data.status !== 200) {
        console.error(
          "Failed to fetch item data:",
          data?.msg || "Unknown error"
        );
        return null;
      }

      setItemInfo(data.data);
    };

    getItemById();
  }, [param.id]);

  if (!itemInfo) return <Loading />;

  return <ItemView itemInfo={itemInfo} />;
}
