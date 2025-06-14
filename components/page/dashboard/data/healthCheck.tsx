import { ALL_COLOR } from "@/lib/consts/colorConsts";
import { Clock } from "lucide-react";
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
          <Clock className="h-5 w-5 text-green-400" />
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
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "1px solid #374151",
              borderRadius: "8px",
              color: "#ffffff",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
            }}
          />
          <Legend fontWeight={"bold"} />
          <Bar
            dataKey="ok_percentage"
            stackId="a"
            fill="#4caf50"
            name="OK"
            fontWeight={"bold"}
          />
          <Bar
            dataKey="fail_percentage"
            stackId="a"
            fill="#f44336"
            fontWeight={"bold"}
            name="FAIL"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
