"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import DefaultAlert from "../../../custom/alert/defaultAlert";
import { Bell, CalendarCheck, Download, Star } from "lucide-react";
import Link from "next/link";
import TextSpan from "../../../custom/gridContents/textSpan";
import type { NewsClient, NewsUserFunction } from "../mainTypes";
import { ALL_COLOR } from "@/lib/consts/colorConsts";

export default function NewsClient({ news }: NewsClient) {
  const router = useRouter();
  const [alertStatus, setAlertStatus] = useState<boolean>(false);

  const newText = (text: NewsUserFunction) => {
    const blinkStyle = {
      animation: "fade 1.5s infinite", // 애니메이션 이름과 설정
    };

    return (
      <span
        key={text.name_en}
        className="font-bold text-CreamYellow cursor-pointer hover:text-SoftPink text-lg"
        onClick={() => router.push(text.link)}
      >
        - {text.name_kr} &nbsp;
        <style>
          {`
          @keyframes fade {
            0%, 100% { opacity: 1; } 
            50% { opacity: 0.5; }    
          }
        `}
        </style>
        <span className="text-SoftPink" style={blinkStyle}>
          {text.is_new ? (text.link === "/planner" ? "Renewal" : "New") : ""}
        </span>
      </span>
    );
  };

  return (
    <div className="rounded-lg flex items-center justify-between border-white border-2 border-solid w-[85%] mx-auto p-4 ">
      <div className="grid grid-cols-3 w-full gap-4">
        <div className="text-lg w-full">
          <div className="flex items-center mb-0.5">
            <Star color={ALL_COLOR.YELLOW} />
            &nbsp;
            <TextSpan isCenter={false} size="lg">
              추천 기능
            </TextSpan>
          </div>

          <div className="flex flex-col">
            {news.user_function.map((func) =>
              func.use_yn ? (
                newText(func)
              ) : (
                <TextSpan key={func.name_en} isCenter={false} size="lg">
                  - {func.name_kr}
                </TextSpan>
              )
            )}
          </div>
        </div>

        <div className="text-lg w-full">
          <div className="flex items-center mb-0.5">
            <Download />
            &nbsp;
            <TextSpan isCenter={false} size="lg">
              타르코프 버전
            </TextSpan>
          </div>
          <TextSpan isCenter={false} size="lg">
            - {news.game_version}
          </TextSpan>
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
            {news.next_update.map((patch) => (
              <TextSpan isCenter={false} key={patch} size="lg">
                - {patch}
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
            <Link href={news.event_link}>
              <TextSpan
                textColor="CreamYellow"
                isCursor
                hoverColor="SoftPink"
                size="lg"
              >
                - 이벤트
              </TextSpan>
            </Link>
            <Link href={news.patch_link}>
              <TextSpan
                textColor="CreamYellow"
                isCursor
                hoverColor="SoftPink"
                size="lg"
              >
                - 패치노트
              </TextSpan>
            </Link>
          </div>
        </div>

        <div className="text-lg w-full">
          <div className="flex items-center mb-0.5">
            <Download />
            &nbsp;
            <TextSpan isCenter={false} size="lg">
              아레나 버전
            </TextSpan>
          </div>
          &nbsp;
          <TextSpan isCenter={false} size="lg">
            - {news.arena_version}
          </TextSpan>
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
