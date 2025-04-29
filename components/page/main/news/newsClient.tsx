"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLocale } from "next-intl";
import DefaultAlert from "../../../custom/alert/defaultAlert";
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
import { getLocalizedKey } from "@/lib/func/localeFunction";
import { ALL_COLOR } from "@/lib/consts/colorConsts";

export default function NewsClient({ news }: NewsClient) {
  const router = useRouter();
  const [alertStatus, setAlertStatus] = useState<boolean>(false);
  const locale = useLocale();

  const newText = (text: LinkInfo) => {
    const blinkStyle = {
      animation: "fade 1.5s infinite", // 애니메이션 이름과 설정
    };

    return (
      <span
        key={text.name_en}
        className="font-bold text-CreamYellow cursor-pointer hover:text-SoftPink text-lg"
        onClick={() => router.push(text.link)}
      >
        -{text[getLocalizedKey(locale)]}
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
              추천 기능
            </TextSpan>
          </div>
          <div className="flex flex-col">
            {news.json_value.recommend.map((func) => newText(func))}
          </div>
        </div>

        <div className="text-lg w-full">
          <div className="flex items-center mb-0.5">
            <PartyPopper />
            &nbsp;
            <TextSpan isCenter={false} size="lg">
              이벤트
            </TextSpan>
          </div>
          <div className="flex flex-col">
            {news.json_value.event.map((event) => (
              <Link
                target="_blank"
                key={event.name_en}
                rel="noopener noreferrer"
                href={event.link}
              >
                <TextSpan
                  textColor="CreamYellow"
                  isCursor
                  hoverColor="SoftPink"
                  size="lg"
                >
                  - {event[getLocalizedKey(locale)]}
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
              업데이트 예정
            </TextSpan>
          </div>
          <div className="flex flex-col">
            {news.json_value.next_update.map((patch) => (
              <TextSpan isCenter={false} key={patch.name_en} size="lg">
                - {patch[getLocalizedKey(locale)]}
              </TextSpan>
            ))}
          </div>
        </div>

        <div className="text-lg w-full">
          <div className="flex items-center mb-0.5">
            <Bell />
            &nbsp;
            <TextSpan isCenter={false} size="lg">
              타르코프 정보
            </TextSpan>
          </div>
          <div className="flex flex-col">
            {news.json_value.tarkov_info.map((info) => (
              <Link
                target="_blank"
                key={info.name_en}
                rel="noopener noreferrer"
                href={info.link}
              >
                <TextSpan
                  textColor="CreamYellow"
                  isCursor
                  hoverColor="SoftPink"
                  size="lg"
                >
                  - {info[getLocalizedKey(locale)]}
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
              패치노트
            </TextSpan>
          </div>
          <div className="flex flex-col">
            {news.json_value.patch.map((patch) => (
              <Link
                target="_blank"
                key={patch.name_en}
                rel="noopener noreferrer"
                href={patch.link}
              >
                <TextSpan
                  textColor="CreamYellow"
                  isCursor
                  hoverColor="SoftPink"
                  size="lg"
                >
                  - {patch[getLocalizedKey(locale)]}
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
              공지사항
            </TextSpan>
          </div>
          <div className="flex flex-col">
            {news.json_value.notice.map((notice) => (
              <Link
                target="_blank"
                key={notice.name_en}
                rel="noopener noreferrer"
                href={notice.link}
              >
                <TextSpan
                  textColor="CreamYellow"
                  isCursor
                  hoverColor="SoftPink"
                  size="lg"
                >
                  - {notice[getLocalizedKey(locale)]}
                </TextSpan>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <DefaultAlert
        open={alertStatus}
        setOpen={setAlertStatus}
        title="알림"
        description="퀘스트 플래너는 로그인 사용자만 사용 가능합니다."
      />
    </div>
  );
}
