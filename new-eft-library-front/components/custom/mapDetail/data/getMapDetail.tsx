"use client";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import MapDetailClient from "@/components/custom/mapDetail/data/mapDetailClient";
import type {MapData} from "@/components/custom/mapDetail/data/mapType";

export default function GetMapDetail() {
    const [mapInfo, setMapInfo] = useState<MapData>();
    const param = useParams<{ id: string }>();

    useEffect(() => {
        const getMapById = async () => {
            const data = await requestData(`${API_ENDPOINTS.GET_MAP}/${param.id}`);

            if (!data || data.status !== 200) {
                console.error(
                    "Failed to fetch map data:",
                    data?.msg || "Unknown error"
                );
                return null;
            }

            setMapInfo(data.data);
        };

        if(param.id) {
            getMapById();
        }
    }, [param.id]);

    if (!mapInfo) return null;

    return <MapDetailClient mapInfo={mapInfo}/>
}