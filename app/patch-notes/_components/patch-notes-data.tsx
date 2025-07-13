"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { information18N } from "@/lib/consts/i18nConsts";
import type { InformationData } from "@/components/custom/information/information.types";
import Information from "@/components/custom/informaition";

export default function PatchNotesData() {
  const [patchNotesData, setPatchNotesData] = useState<InformationData>();
  const param = useSearchParams();
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  useEffect(() => {
    const getPatchNotesPage = async () => {
      const data = await requestData(
        `${API_ENDPOINTS.GET_PATCH_NOTES}?page=${Number(
          param.get("id")
        )}&page_size=10`
      );

      if (!data || data.status !== 200) {
        console.error(
          "Failed to fetch patch notes data:",
          data?.msg || "Unknown error"
        );
        return null;
      }
      setPatchNotesData(data.data);
    };

    if (param.get("id")) {
      getPatchNotesPage();
    }
  }, [param]);

  if (!patchNotesData) return null;

  return (
    <Information
      informationData={patchNotesData}
      routeLink="/patch-notes"
      title={information18N.patchNotes.title[localeKey]}
    />
  );
}
