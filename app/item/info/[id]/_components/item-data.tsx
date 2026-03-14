import ItemView from "./item-view";
import { notFound } from "next/navigation";
import { cacheRequestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";

export default async function ItemData({ id }: { id: string }) {
  try {
    const data = await cacheRequestData(
      `${API_ENDPOINTS.GET_ITEM_DETAIL}/${id}`,
    );
    return <ItemView itemInfo={data.data} />;
  } catch (error) {
    notFound();
  }
}
