"use server";

import { cacheLife } from "next/cache";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { COLUMN_KEY } from "@/lib/consts/columnConsts";
import PrivacyPolicyView from "./privacy-policy-view";

async function fetchData() {
  "use cache";
  cacheLife({
    stale: 86400, // 24시간 fresh
    revalidate: 86400, // 24시간 후 재검증
    expire: 604800, // 7일 후 완전 만료
  });

  const res = await fetch(
    `${API_ENDPOINTS.GET_DYNAMIC_INFO}/${COLUMN_KEY.privacyPolicy}`,
  );
  return res.json();
}

export default async function PrivacyPolicyData() {
  const data = await fetchData();

  if (!data || data.status !== 200) {
    console.error(
      "Failed to fetch privacy policy data:",
      data?.msg || "Unknown error",
    );
    return null;
  }

  return <PrivacyPolicyView privacyPolicy={data.data} />;
}
