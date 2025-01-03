"use client";

import { Button } from "@/components/ui/button";
import {formatISODate} from "@/lib/func/formatTime";
import Link from "next/link";

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

interface PatchNotesDetailClient {
    patchNotesInfo: InformationInfoDetail
}

export default function PatchNotesDetailClient({patchNotesInfo}: PatchNotesDetailClient) {
    return <div className={"w-full flex flex-col gap-4"}>
        <div className={"rounded-lg flex flex-col border-2 border-solid border-white p-4"}>
            <div className={"flex justify-center items-center"}>
                <span className={"font-bold text-xl text-white mb-6"}>
                    {patchNotesInfo.information.name_kr}&nbsp;(
                    {formatISODate(patchNotesInfo.information.update_time)})
                </span>
            </div>
            <div>
                <div
                    className={"font-bold text-white text-base"}
                    dangerouslySetInnerHTML={{
                        __html: `${patchNotesInfo.information.notes_kr}`,
                    }}/>
            </div>
        </div>

        <div className={"flex justify-end"}>
            <Link href={"/patch-notes?id=1"}>
                <Button className={"rounded-lg font-bold text-base text-white bg-Background border-white border-solid border-2 hover:bg-NeutralGray"}>목록</Button>
            </Link>
        </div>

        <div className={"flex flex-col gap-6"}>
            {patchNotesInfo.information_group.map((info) => (
                <Link href={`/patch-notes/detail/${info.id}`} key={info.id}>
                    <div className={"flex justify-between items-center border-solid border-white border-2 p-4 rounded-lg hover:bg-NeutralGray"}>
                        <span className={"font-bold text-white text-lg"}>
                            {info.name_kr}
                        </span>
                        <span  className={"font-bold text-white text-base"}>
                            {formatISODate(info.update_time)}
                        </span>
                    </div>
                </Link>
            ))}
        </div>
    </div>
}