"use client";

import Link from "next/link";
import { formatISODate } from "@/lib/func/formatTime";
import PaginationCustom from "@/components/custom/pagination/paginationCustom";
import { useSearchParams } from "next/navigation";

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

interface NoticeClient {
  noticeData: NoticeData;
}

export default function NoticeClient({ noticeData }: NoticeClient) {
  const param = useSearchParams();
  const getFirstParagraph = (htmlString: string) => {
    // HTML 문자열을 DOM으로 파싱
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    // 첫 번째 <p> 태그 선택
    const firstParagraph = doc.querySelector("p");

    // <p> 태그의 HTML을 반환
    return firstParagraph ? firstParagraph.outerHTML : "";
  };

  return (
    <div className={"w-full flex flex-col justify-center items-center gap-4"}>
      {noticeData.data.map((notes) => (
        <div key={notes.id} className={"w-full"}>
          <Link href={`/notice/detail/${notes.id}`}>
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
        total={noticeData.max_pages}
        routeLink={"/notice?id="}
        currentPage={Number(param.get("id"))}
      />
    </div>
  );
}
