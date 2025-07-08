"use client";

import { QuestDetailTypes } from "@/app/quest/_components/quest.types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

export default function QuestGuide({ quest }: QuestDetailTypes) {
  return (
    <Card className="mx-4 sm:mx-0 bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700/50 shadow-xl">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-black dark:text-white mb-2">
              가이드
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              그라운드 제로에서{" "}
              <span className="text-lime-400 font-semibold">
                Emercom Station
              </span>
              을 찾고, 레이드에서 발견한 의약품 3개를 테라피스트에게 전달해야
              합니다.
            </p>
            <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm sm:text-base">
              <span className="text-lime-400 font-semibold">
                Emercom Station
              </span>
              은{" "}
              <span className="text-blue-400 font-semibold">
                Unity Credit Bank
              </span>{" "}
              앞에 있습니다.
            </p>
          </div>
          <Button
            variant="outline"
            className="border-yellow-400/50 text-yellow-400 hover:bg-yellow-400/10 bg-transparent shrink-0 text-sm sm:text-base"
          >
            <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            Wiki Quest Page
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
