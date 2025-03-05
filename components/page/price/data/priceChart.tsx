import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import type { PriceChart } from "./priceTypes";
import { ALL_COLOR } from "@/lib/consts/colorConsts";

export default function PriceChart({ viewType, item }: PriceChart) {
  if (!item) return null;

  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: any[];
  }) => {
    if (active && payload && payload.length) {
      const formattedDate = dayjs(payload[0].payload.price_time).format(
        "YYYY년 MM월 DD일 HH시 mm분 ss초"
      );

      return (
        <div
          style={{
            backgroundColor: "black",
            border: "2px solid white",
            color: "white",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <p style={{ margin: 0, fontWeight: "bold" }}>{formattedDate}</p>
          <span style={{ margin: 0, fontWeight: "bold" }}>플리마켓 시세:</span>
          <span
            style={
              viewType === "PVP"
                ? { color: ALL_COLOR.PeachCream, fontWeight: "bold" }
                : { color: ALL_COLOR.SkyBloom, fontWeight: "bold" }
            }
          >
            &nbsp;{payload[0].value}
          </span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          width={500}
          height={300}
          data={
            viewType === "PVP"
              ? item.history_by_type.pvp
              : item.history_by_type.pve
          }
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="price_time"
            tick={{ fill: "white", fontWeight: "bold" }}
            tickFormatter={(value, index) => {
              return index === 0 ? "" : dayjs(value).format("MM/DD HH:mm");
            }}
            interval={Math.floor(
              viewType === "PVP"
                ? item.history_by_type.pvp.length / 10
                : item.history_by_type.pve.length / 10
            )}
          />
          <YAxis
            tick={{ fill: "white", fontWeight: "bold" }}
            tickFormatter={(value) => value.toLocaleString()}
            width={100}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "black", // 배경을 검은색으로
              border: "1px solid white", // 테두리 흰색
              color: "white", // 기본 글씨색 흰색
            }}
            itemStyle={{
              color: "white", // 항목 글씨 흰색
            }}
            wrapperStyle={{
              outline: "none", // 기본 포커스 효과 제거 (선택 사항)
            }}
            content={CustomTooltip}
          />
          <Area
            type="monotone"
            dataKey="item_price"
            stroke={
              viewType === "PVP" ? ALL_COLOR.PeachCream : ALL_COLOR.SkyBloom
            }
            fill={
              viewType === "PVP" ? ALL_COLOR.PeachCream : ALL_COLOR.SkyBloom
            }
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
