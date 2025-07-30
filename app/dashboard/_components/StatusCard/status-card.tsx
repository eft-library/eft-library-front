import { StatusCardTypes } from "../dashboard.types";
import { dashboardI18N } from "@/lib/consts/i18nConsts";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { useLocale } from "next-intl";

export default function StatusCard({ chartData }: StatusCardTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-gray-800 rounded-lg shadow-2xl border border-gray-700 hover:border-blue-500/50 transition-colors duration-300">
        <div className="p-6">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"></div>
            <span className="text-sm font-semibold text-gray-300">
              {dashboardI18N.fastApiAvgResponseTime[localeKey]}
            </span>
          </div>
          <div className="text-2xl font-bold text-blue-400 mt-2">
            {chartData.response_time[0]?.avg_response_ms ?? "-"} ms
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-2xl border border-gray-700 hover:border-green-500/50 transition-colors duration-300">
        <div className="p-6">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full shadow-lg shadow-green-400/50"></div>
            <span className="text-sm font-semibold text-gray-300">
              {dashboardI18N.nextJsAvgResponseTime[localeKey]}
            </span>
          </div>
          <div className="text-2xl font-bold text-green-400 mt-2">
            {chartData.response_time[1]?.avg_response_ms ?? "-"} ms
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-2xl border border-gray-700 hover:border-yellow-500/50 transition-colors duration-300">
        <div className="p-6">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-yellow-400 rounded-full shadow-lg shadow-yellow-400/50"></div>
            <span className="text-sm font-semibold text-gray-300">
              {dashboardI18N.activeUsersInPeriod[localeKey]}
            </span>
          </div>
          <div className="text-2xl font-bold text-yellow-400 mt-2">
            {chartData.active_user.active_user.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-2xl border border-gray-700 hover:border-purple-500/50 transition-colors duration-300">
        <div className="p-6">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50"></div>
            <span className="text-sm font-semibold text-gray-300">
              {dashboardI18N.totalUsers[localeKey]}
            </span>
          </div>
          <div className="text-2xl font-bold text-purple-400 mt-2">
            {chartData.total_user.user_total_count.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
}
