import InformationDetail from "@/components/custom/information/information-detail";
import { cacheRequestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { information18N } from "@/lib/consts/i18nConsts";

export default async function NoticeDetailData({ id }: { id: string }) {
  const data = await cacheRequestData(
    `${API_ENDPOINTS.GET_INFORMATION_BY_ID_TYPE}/NOTICE/detail/${id}`,
  );

  return (
    <InformationDetail
      informationInfo={data.data}
      routeLink="/notice"
      title={information18N.notice.title}
    />
  );
}
