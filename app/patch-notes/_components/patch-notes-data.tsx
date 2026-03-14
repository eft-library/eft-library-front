import { cacheRequestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { information18N } from "@/lib/consts/i18nConsts";
import Information from "@/components/custom/information/informaition";

export default async function PatchNotesData({ id }: { id: string }) {
  const data = await cacheRequestData(
    `${API_ENDPOINTS.GET_INFORMATION_LIST}?page=${Number(id)}&page_size=10&info_type=PATCH-NOTES`,
  );

  return (
    <Information
      informationData={data.data}
      routeLink="/patch-notes"
      title={information18N.patchNotes.title}
    />
  );
}
