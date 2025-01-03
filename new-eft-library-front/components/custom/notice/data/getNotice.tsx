"use client";

import {useEffect, useState} from "react";
import { useSearchParams } from "next/navigation";
import {requestData} from "@/lib/config/api";
import {API_ENDPOINTS} from "@/lib/config/endpoint";
import NoticeClient from "@/components/custom/notice/data/noticeClient";


 interface NoticeInfo {
    id: string;
    name_en: string[];
    name_kr: string[];
    notes_en: string;
    notes_kr: string;
    update_time: string;
}
 interface NoticeData {
    data: NoticeInfo[];
    total_count: number;
    max_pages: number;
    current_page: number;
}

export default function GetNotice() {
    const [noticeData, setNoticeData] = useState<NoticeData>();
    const param = useSearchParams();

    useEffect(() => {
        const getNoticePage = async () => {
            const data = await requestData(`${API_ENDPOINTS.GET_NOTICE}?page=${Number(param.get("id"))}&page_size=10`);

            if (!data || data.status !== 200) {
                console.error(
                    "Failed to fetch notice data:",
                    data?.msg || "Unknown error"
                );
                return null;
            }
            setNoticeData(data.data);
        };

        if (param.get("id")) {
            getNoticePage();
        }

    }, [param]);

    if (!noticeData) return null;

    return <NoticeClient noticeData={noticeData}/>;

}