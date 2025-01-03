"use client";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import EventDetailClient from "@/components/custom/eventDetail/data/eventDetailClient";

interface InformationInfoDetail {
    information_group: InformationInfo[];
    information: InformationInfo;
}
interface InformationInfo{
    id: string;
    name_en: string[];
    name_kr: string[];
    notes_en: string;
    notes_kr: string;
    update_time: string;
}

export default function GetEventDetail() {
    const [eventInfo, setEventInfo] = useState<InformationInfoDetail>();
    const param = useParams<{ id: string }>();

    useEffect(() => {
        const getEventById = async () => {
            const data = await requestData(`${API_ENDPOINTS.GET_EVENT_BY_ID}/${param.id}`);

            if (!data || data.status !== 200) {
                console.error(
                    "Failed to fetch event data:",
                    data?.msg || "Unknown error"
                );
                return null;
            }

            setEventInfo(data.data);
        };

        if(param.id) {
            getEventById();
        }
    }, [param.id]);

    if (!eventInfo) return null;

    return <EventDetailClient eventInfo={eventInfo}/>;
}