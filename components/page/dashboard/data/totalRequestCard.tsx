import { Activity, CalendarDays, TrendingUp } from "lucide-react";

interface TotalRequestCardProps {
  totalRequests: number;
}

export default function TotalRequestCard({
  totalRequests,
}: TotalRequestCardProps) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-lg shadow-2xl border border-gray-700">
      <div className="p-8 text-center space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <Activity className="h-8 w-8" />
          <span className="text-lg font-medium">총 요청수</span>
        </div>
        <div className="text-5xl font-bold">
          {totalRequests.toLocaleString()}
        </div>
        <div className="flex items-center justify-center space-x-4 text-sm opacity-90">
          <div className="flex items-center space-x-1">
            <CalendarDays className="h-4 w-4" />
            <span>지난 24시간</span>
          </div>
          <div className="flex items-center space-x-1">
            <TrendingUp className="h-4 w-4" />
            <span>+12.5% 증가</span>
          </div>
        </div>
      </div>
    </div>
  );
}
