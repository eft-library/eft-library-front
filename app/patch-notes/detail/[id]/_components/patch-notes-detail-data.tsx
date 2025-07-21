"use client";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { information18N } from "@/lib/consts/i18nConsts";
import { InformationInfoDetail } from "@/components/custom/information/information.types";
import InformationDetail from "@/components/custom/information/information-detail";
import Loading from "@/components/custom/Loading/loading";

export default function PatchNotesDetailData() {
  const [patchNotesInfo, setPatchNotesInfo] = useState<InformationInfoDetail>();
  const param = useParams<{ id: string }>();
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  useEffect(() => {
    const getPatchNotesById = async () => {
      const data = await requestData(
        `${API_ENDPOINTS.GET_PATCH_NOTES_BY_ID}/${param.id}`
      );

      if (!data || data.status !== 200) {
        console.error(
          "Failed to fetch patch notes data:",
          data?.msg || "Unknown error"
        );
        return null;
      }

      setPatchNotesInfo(data.data);
    };

    if (param.id) {
      getPatchNotesById();
    }
  }, [param.id]);

  if (!patchNotesInfo) return <Loading />;

  return (
    <InformationDetail
      informationInfo={patchNotesInfo}
      routeLink="/patch-notes"
      title={information18N.patchNotes.title[localeKey]}
    />
  );
}
