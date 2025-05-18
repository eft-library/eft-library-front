"use client";

import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import {
  Bell,
  CalendarCheck,
  Star,
  Wrench,
  PartyPopper,
  Megaphone,
} from "lucide-react";
import Link from "next/link";
import TextSpan from "../../../custom/gridContents/textSpan";
import type { NewsClient, LinkInfo } from "../mainTypes";
import { ALL_COLOR } from "@/lib/consts/colorConsts";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { newsI18N } from "@/lib/consts/i18nConsts";

export default function NewsClient({ news }: NewsClient) {
  const router = useRouter();
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  const blinkText = (text: LinkInfo) => {
    const blinkStyle = {
      animation: "fade 1.5s infinite", // 애니메이션 이름과 설정
    };

    return (
      <span
        key={text.en}
        className="font-bold text-CreamYellow cursor-pointer hover:text-SoftPink text-lg"
        onClick={() => router.push(text.link)}
      >
        -{text[localeKey]}
        &nbsp;
        <style>
          {`
          @keyframes fade {
            0%, 100% { opacity: 1; } 
            50% { opacity: 0.5; }    
          }
        `}
        </style>
        <span className="text-NeonOrange" style={blinkStyle}>
          {text.is_new ? "New" : ""}
          {text.is_renewal ? "Renewal" : ""}
        </span>
      </span>
    );
  };

  return (
    <div className="rounded-lg flex items-center justify-between border-white border-2 border-solid w-[85%] mx-auto p-4 ">
      <div className="grid grid-cols-3 w-full gap-4">
        <div className="text-lg w-full">
          <div className="flex items-center mb-0.5">
            <Star color={ALL_COLOR.Yellow} />
            &nbsp;
            <TextSpan isCenter={false} size="lg">
              {newsI18N.recommendationFeature[localeKey]}
            </TextSpan>
          </div>
          <div className="flex flex-col">
            {news.json_value.recommend.map((func) => blinkText(func))}
          </div>
        </div>

        <div className="text-lg w-full">
          <div className="flex items-center mb-0.5">
            <PartyPopper />
            &nbsp;
            <TextSpan isCenter={false} size="lg">
              {newsI18N.event[localeKey]}
            </TextSpan>
          </div>
          <div className="flex flex-col">
            {news.json_value.event.map((event) => (
              <Link
                target="_blank"
                key={event.en}
                rel="noopener noreferrer"
                href={event.link}
              >
                <TextSpan
                  textColor="CreamYellow"
                  isCursor
                  hoverColor="SoftPink"
                  size="lg"
                >
                  - {event[localeKey]}
                </TextSpan>
              </Link>
            ))}
          </div>
        </div>

        <div className="text-lg w-full">
          <div className="flex items-center mb-0.5">
            <CalendarCheck />
            &nbsp;
            <TextSpan isCenter={false} size="lg">
              {newsI18N.comingSoon[localeKey]}
            </TextSpan>
          </div>
          <div className="flex flex-col">
            {news.json_value.next_update.map((patch) => (
              <TextSpan isCenter={false} key={patch.en} size="lg">
                - {patch[localeKey]}
              </TextSpan>
            ))}
          </div>
        </div>

        <div className="text-lg w-full">
          <div className="flex items-center mb-0.5">
            <Bell />
            &nbsp;
            <TextSpan isCenter={false} size="lg">
              {newsI18N.tarkovInfo[localeKey]}
            </TextSpan>
          </div>
          <div className="flex flex-col">
            {news.json_value.tarkov_info.map((info) => (
              <Link
                target="_blank"
                key={info.en}
                rel="noopener noreferrer"
                href={info.link}
              >
                <TextSpan
                  textColor="CreamYellow"
                  isCursor
                  hoverColor="SoftPink"
                  size="lg"
                >
                  - {info[localeKey]}
                </TextSpan>
              </Link>
            ))}
          </div>
        </div>

        <div className="text-lg w-full">
          <div className="flex items-center mb-0.5">
            <Wrench />
            &nbsp;
            <TextSpan isCenter={false} size="lg">
              {newsI18N.patchNote[localeKey]}
            </TextSpan>
          </div>
          <div className="flex flex-col">
            {news.json_value.patch.map((patch) => (
              <Link
                target="_blank"
                key={patch.en}
                rel="noopener noreferrer"
                href={patch.link}
              >
                <TextSpan
                  textColor="CreamYellow"
                  isCursor
                  hoverColor="SoftPink"
                  size="lg"
                >
                  - {patch[localeKey]}
                </TextSpan>
              </Link>
            ))}
          </div>
        </div>

        <div className="text-lg w-full">
          <div className="flex items-center mb-0.5">
            <Megaphone />
            &nbsp;
            <TextSpan isCenter={false} size="lg">
              {newsI18N.notice[localeKey]}
            </TextSpan>
          </div>
          <div className="flex flex-col">
            {news.json_value.notice.map((notice) => (
              <Link
                target="_blank"
                key={notice.en}
                rel="noopener noreferrer"
                href={notice.link}
              >
                <TextSpan
                  textColor="CreamYellow"
                  isCursor
                  hoverColor="SoftPink"
                  size="lg"
                >
                  - {notice[localeKey]}
                </TextSpan>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
