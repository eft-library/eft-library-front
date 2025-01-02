"use server";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import HideoutClient from "@/components/custom/hideout/data/hideoutClient";

export default async function GetHideout() {
    const data = await requestData(API_ENDPOINTS.GET_ALL_HIDEOUT);

    if (!data || data.status !== 200) {
        console.error(
            "Failed to fetch hideout data:",
            data?.msg || "Unknown error"
        );
        return null;
    }

    return <HideoutClient hideoutList={data.data}/>
}
