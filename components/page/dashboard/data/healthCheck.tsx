import { ALL_COLOR } from "@/lib/consts/colorConsts";
import { CheckCircle2 } from "lucide-react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { HealthCheck } from "./dashboardTypes";

export default function HealthCheck({ health_check }: HealthCheck) {
  console.log(health_check);
  return (
    <div className="bg-gray-800 rounded-lg shadow-2xl border border-gray-700">
      <div className="p-6 pb-2">
        <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
          <CheckCircle2 className="h-5 w-5 text-orange-500" />
          <span>서비스 상태</span>
        </h3>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={health_check} layout="vertical" margin={{ left: 80 }}>
          <XAxis
            type="number"
            domain={[0, 100]}
            unit="%"
            tick={{ fill: ALL_COLOR.White, fontWeight: "bold" }}
          />
          <YAxis
            type="category"
            dataKey="service_name"
            tick={{ fill: ALL_COLOR.White, fontSize: 12 }}
          />
          <Tooltip
            formatter={(value, name, entry) => {
              const payload = entry?.payload;
              const label = name === "정상" ? "성공률" : "실패율";

              // tooltip에 보여줄 부가 정보 구성
              const extra = ` (성공 ${payload.ok_count} / 실패 ${payload.fail_count} / 총 ${payload.total})`;

              return [`${value.toLocaleString()} %${extra}`, label];
            }}
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "1px solid #374151",
              borderRadius: "8px",
              color: "#ffffff",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
            }}
          />
          <Legend fontWeight={"bold"} />
          <Bar dataKey="ok_percentage" stackId="a" fill="#34d399" name="정상" />
          <Bar
            dataKey="fail_percentage"
            stackId="a"
            fill="#f44336"
            name="이상"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
