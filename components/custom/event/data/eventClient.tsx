"use client";

import EventTab from "@/components/custom/event/data/eventTab";
import Link from "next/link";
import { formatISODate } from "@/lib/func/formatTime";
import PaginationCustom from "@/components/custom/pagination/paginationCustom";
import { useSearchParams } from "next/navigation";
import { getFirstParagraph } from "@/lib/func/jsxfunction";

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

interface EventClient {
  eventData: EventData;
}

export default function EventClient({ eventData }: EventClient) {
  const param = useSearchParams();

  return (
    <div className={"w-full flex flex-col justify-center items-center gap-4"}>
      <EventTab />
      {eventData.data.map((notes) => (
        <div key={notes.id} className={"w-full"}>
          <Link href={`/event/detail/${notes.id}`}>
            <div
              className={
                "rounded-lg flex flex-col border-white border-solid border-2 mb-[4px] w-full hover:MutedGray"
              }
            >
              <div className={"flex justify-between items-center"}>
                <span className={"text-2xl font-bold text-white p-4"}>
                  {notes.name_kr}
                </span>
                <span className={"text-base font-semibold text-white p-4"}>
                  {formatISODate(notes.update_time)}
                </span>
              </div>
              <div className={"p-4"}>
                <div
                  className={"truncate text-base font-semibold text-white"}
                  dangerouslySetInnerHTML={{
                    __html: getFirstParagraph(notes.notes_kr),
                  }}
                ></div>
              </div>
            </div>
          </Link>
        </div>
      ))}
      <PaginationCustom
        total={eventData.max_pages}
        routeLink={"/event?id="}
        currentPage={Number(param.get("id"))}
      />
    </div>
  );
}
