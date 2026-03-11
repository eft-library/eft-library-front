import ItemView from "./item-view";
import { notFound } from "next/navigation";
import { fetchItemData } from "../_lib/fetch-item-detail";

export default async function ItemData({ id }: { id: string }) {
  try {
    const data = await fetchItemData(id);

    if (!data) {
      notFound();
    }

    return <ItemView itemInfo={data} />;
  } catch (error) {
    console.error(error);
    notFound();
  }
}
