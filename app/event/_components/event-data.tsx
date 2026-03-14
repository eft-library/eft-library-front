import { cacheRequestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import Information from "@/components/custom/information/informaition";
import { information18N } from "@/lib/consts/i18nConsts";

export default async function EventData({ id }: { id: string }) {
  const data = await cacheRequestData(
    `${API_ENDPOINTS.GET_INFORMATION_LIST}?page=${Number(id)}&page_size=10&info_type=EVENT`,
  );

  return (
    <Information
      informationData={data.data}
      routeLink="/event"
      title={information18N.event.title}
    />
  );
}
