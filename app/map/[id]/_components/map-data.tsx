import MapView from "./map-view";
import { notFound } from "next/navigation";
import { fetchMapData } from "../_lib/fetch-map-data";

export default async function MapData({ id }: { id: string }) {
  try {
    const data = await fetchMapData(id);

    if (!data) {
      notFound();
    }

    return <MapView mapInfo={data} />;
  } catch (error) {
    console.error(error);
    notFound();
  }
}
