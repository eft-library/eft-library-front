"use client";

import {useEffect, useState} from "react";
import { useSearchParams } from "next/navigation";
import {requestData} from "@/lib/config/api";
import {API_ENDPOINTS} from "@/lib/config/endpoint";
import EventClient from "@/components/custom/event/data/eventClient";


 interface EventInfo {
    id: string;
    name_en: string[];
    name_kr: string[];
    notes_en: string;
    notes_kr: string;
    update_time: string;
}
 interface EventData {
    data: EventInfo[];
    total_count: number;
    max_pages: number;
    current_page: number;
}

export default function GetEvent() {
    const [eventData, setEventData] = useState<EventData>();
    const param = useSearchParams();

    useEffect(() => {
        const getEventPage = async () => {
            const data = await requestData(`${API_ENDPOINTS.GET_EVENT}?page=${Number(param.get("id"))}&page_size=10`);

            if (!data || data.status !== 200) {
                console.error(
                    "Failed to fetch event data:",
                    data?.msg || "Unknown error"
                );
                return null;
            }
            setEventData(data.data);
        };

        if (param.get("id")) {
            getEventPage();
        }

    }, [param]);

    if (!eventData) return null;

    return <EventClient eventData={eventData}/>;

}