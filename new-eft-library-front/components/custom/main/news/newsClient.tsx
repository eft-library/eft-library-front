"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DefaultAlert from "../../alert/defaultAlert";
import { Bell, CalendarCheck, Download, LogIn } from "lucide-react";
import Link from "next/link";

interface News {
  game_version: string;
  arena_version: string;
  patch_link: string;
  event_link: string;
  youtube_id: string;
  next_update: string[];
  user_function: NewsUserFunction[];
}

interface NewsUserFunction {
  link: string;
  name_en: string;
  name_kr: string;
  use_yn: boolean;
}

interface NewsClient {
  news: News;
}

export default function NewsClient({ news }: NewsClient) {
  const { data: session } = useSession();
  const router = useRouter();
  const [alertStatus, setAlertStatus] = useState<boolean>(false);

  const onClickUserFunction = (link: string) => {
    if (session) {
      router.push(link);
    } else {
      setAlertStatus(!alertStatus);
    }
  };

  return (
    <div className="rounded-lg flex items-center justify-between border-white border-2 border-solid w-[85%] mx-auto p-4 ">
      <div className="grid grid-cols-3 w-full gap-4">
        <div className="text-lg w-full">
          <div className="flex items-center mb-0.5">
            <LogIn />
            &nbsp;<span className="font-bold text-white">로그인 기능</span>
          </div>

          <div className="flex flex-col">
            {news.user_function.map((func) =>
              func.use_yn ? (
                <span
                  key={func.name_en}
                  className="font-bold text-CreamYellow cursor-pointer hover:text-SoftPink"
                  onClick={() => onClickUserFunction(func.link)}
                >
                  - {func.name_kr}
                </span>
              ) : (
                <span key={func.name_en} className="font-bold text-white">
                  - {func.name_kr}
                </span>
              )
            )}
          </div>
        </div>

        <div className="text-lg w-full">
          <div className="flex items-center mb-0.5">
            <Download />
            &nbsp;<span className="font-bold text-white">현재 게임 버전</span>
          </div>
          <span className="font-bold text-white">- {news.game_version}</span>
        </div>

        <div className="text-lg w-full">
          <div className="flex items-center mb-0.5">
            <CalendarCheck />
            &nbsp;<span className="font-bold text-white">업데이트 예정</span>
          </div>
          <div className="flex flex-col">
            {news.next_update.map((patch) => (
              <span key={patch} className="font-bold text-white">
                - {patch}
              </span>
            ))}
          </div>
        </div>

        <div className="text-lg w-full">
          <div className="flex items-center mb-0.5">
            <Bell />
            &nbsp;<span className="font-bold text-white">타르코프 정보</span>
          </div>

          <div className="flex flex-col">
            <Link href={news.event_link}>
              <span className="font-bold text-CreamYellow cursor-pointer hover:text-SoftPink">- 이벤트</span>
            </Link>
            <Link href={news.patch_link}>
              <span className="font-bold text-CreamYellow cursor-pointer hover:text-SoftPink">- 패치노트</span>
            </Link>
          </div>
        </div>

        <div className="text-lg w-full">
          <div className="flex items-center mb-0.5">
            <Download />
            &nbsp;<span className="font-bold text-white">아레나 버전</span>
          </div>
          <span className="font-bold text-white">- {news.arena_version}</span>
        </div>
      </div>

      <DefaultAlert
        open={alertStatus}
        setOpen={setAlertStatus}
        title="알림"
        description="로그인 한 사용자만 가능합니다."
      />
    </div>
  );
}
