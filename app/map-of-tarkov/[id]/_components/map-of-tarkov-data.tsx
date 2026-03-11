import MapOfTarkovView from "./map-of-tarkov-view";
import { notFound } from "next/navigation";
import { fetchMotData } from "../_lib/fetch-mot-data";

export default async function MapOfTarkovData({ id }: { id: string }) {
  try {
    const data = await fetchMotData(id);

    if (!data) {
      notFound();
    }

    return <MapOfTarkovView mapData={data} />;
  } catch (error) {
    console.error(error);
    notFound();
  }
}
