import { cacheRequestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { information18N } from "@/lib/consts/i18nConsts";
import InformationDetail from "@/components/custom/information/information-detail";

export default async function EventDetailData({ id }: { id: string }) {
  const data = await cacheRequestData(
    `${API_ENDPOINTS.GET_INFORMATION_BY_ID_TYPE}/EVENT/detail/${id}`,
  );
  return (
    <InformationDetail
      informationInfo={data.data}
      routeLink="/event"
      title={information18N.event.title}
    />
  );
}
