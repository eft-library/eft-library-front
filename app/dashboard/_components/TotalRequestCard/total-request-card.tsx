import { Activity, CalendarDays } from "lucide-react";
import { TotalRequestCardTypes } from "../dashboard.types";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { useLocale } from "next-intl";
import { dashboardI18N } from "@/lib/consts/i18nConsts";

export default function TotalRequestCard({
  total_request,
  startDate,
  endDate,
}: TotalRequestCardTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  return (
    <div className="bg-linear-to-r from-blue-600 to-purple-700 text-white rounded-lg shadow-2xl border border-gray-700">
      <div className="p-8 text-center space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <Activity className="h-8 w-8" />
          <span className="text-lg font-semibold">
            {dashboardI18N.totalRequests[localeKey]}
          </span>
        </div>
        <div className="text-5xl font-bold">
          {total_request.current_requests.toLocaleString()}
        </div>
        <div className="flex items-center justify-center space-x-4 text-sm opacity-90">
          <div className="flex items-center space-x-1">
            <CalendarDays className="h-4 w-4" />
            <span>
              {startDate?.toLocaleDateString("ko-KR")} ~
              {endDate?.toLocaleDateString("ko-KR")}
            </span>
          </div>
          {/* <div className="flex items-center space-x-1">
            <TrendingUp className="h-4 w-4" />
            <span>{total_request.percent_change}%</span>
          </div> */}
        </div>
      </div>
    </div>
  );
}
