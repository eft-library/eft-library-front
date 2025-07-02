"use client";

import InformationTab from "../informationTab/informationTab";
import Link from "next/link";
import { formatISODate } from "@/lib/func/formatTime";
import PaginationCustom from "../pagination/paginationCustom";
import { useSearchParams } from "next/navigation";
import { getFirstParagraph } from "@/lib/func/jsxfunction";
import type { InformationClient } from "./informationTypes";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";

export default function Information({
  informationData,
  routeLink,
}: InformationClient) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const param = useSearchParams();

  return (
    <div className={"w-full flex flex-col justify-center items-center gap-4"}>
      <InformationTab />
      {informationData.data.map((notes) => (
        <div key={notes.id} className={"w-full"}>
          <Link href={`${routeLink}/detail/${notes.id}`}>
            <div
              className={
                "rounded-lg flex flex-col border-white border-solid border-2 mb-[4px] w-full hover:MutedGray"
              }
            >
              <div className={"flex justify-between items-center"}>
                <span className={"text-2xl font-bold text-white p-4"}>
                  {notes.name[localeKey]}
                </span>
                <span className={"text-base font-semibold text-white p-4"}>
                  {formatISODate(notes.update_time)}
                </span>
              </div>
              <div className={"p-4"}>
                <div
                  className={"truncate text-base font-semibold text-white"}
                  dangerouslySetInnerHTML={{
                    __html: getFirstParagraph(notes.description[localeKey]),
                  }}
                ></div>
              </div>
            </div>
          </Link>
        </div>
      ))}
      <PaginationCustom
        total={informationData.max_pages}
        routeLink={`${routeLink}?id=`}
        currentPage={Number(param.get("id"))}
      />
    </div>
  );
}
