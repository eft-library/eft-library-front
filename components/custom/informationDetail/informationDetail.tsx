"use client";

import { Button } from "@/components/ui/button";
import { formatISODate } from "@/lib/func/formatTime";
import Link from "next/link";
import AdBanner from "../adsense/adBanner";
import TextSpan from "../gridContents/textSpan";
import type { InformationDetailClient } from "./informationDetailTypes";

export default function InformationDetailClient({
  informationInfo,
  routeLink,
}: InformationDetailClient) {
  return (
    <div className={"w-full flex flex-col gap-4"}>
      <div
        className={
          "rounded-lg flex flex-col border-2 border-solid border-white p-4"
        }
      >
        <div className={"flex justify-center items-center"}>
          <span className={"font-bold text-xl text-white mb-6"}>
            {informationInfo.information.name_kr}&nbsp;(
            {formatISODate(informationInfo.information.update_time)})
          </span>
        </div>
        <div>
          <div
            className={"font-bold text-white text-base"}
            dangerouslySetInnerHTML={{
              __html: `${informationInfo.information.notes_kr}`,
            }}
          />
        </div>
      </div>
      <AdBanner
        dataAdFormat={"auto"}
        dataFullWidthResponsive={true}
        dataAdSlot="2690838054"
      />

      <div className={"flex justify-end"}>
        <Link href={`${routeLink}?id=1`}>
          <Button
            className={
              "rounded-lg font-bold text-base text-white bg-Background border-white border-solid border-2 hover:bg-NeutralGray"
            }
          >
            목록
          </Button>
        </Link>
      </div>

      <div className={"flex flex-col gap-6"}>
        {informationInfo.information_group.map((info) => (
          <Link href={`${routeLink}/detail/${info.id}`} key={info.id}>
            <div
              className={
                "flex justify-between items-center border-solid border-white border-2 p-4 rounded-lg hover:bg-NeutralGray"
              }
            >
              <TextSpan isCenter={false} size="lg">
                {info.name_kr}
              </TextSpan>
              <TextSpan isCenter={false}>
                {formatISODate(info.update_time)}
              </TextSpan>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
