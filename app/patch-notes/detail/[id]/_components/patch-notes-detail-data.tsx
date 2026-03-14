import { cacheRequestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { information18N } from "@/lib/consts/i18nConsts";
import InformationDetail from "@/components/custom/information/information-detail";

export default async function PatchNotesDetailData({ id }: { id: string }) {
  const data = await cacheRequestData(
    `${API_ENDPOINTS.GET_INFORMATION_BY_ID_TYPE}/PATCH-NOTES/detail/${id}`,
  );

  return (
    <InformationDetail
      informationInfo={data.data}
      routeLink="/patch-notes"
      title={information18N.patchNotes.title}
    />
  );
}
