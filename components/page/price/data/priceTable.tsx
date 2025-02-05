"use client";

import CenterContents from "@/components/custom/gridContents/centerContents";
import type { PriceTable, TradeOption } from "./priceTypes";
import ImageView from "@/components/custom/imageView/imageView";
import TextSpan from "@/components/custom/gridContents/textSpan";
import { formatImage } from "@/lib/func/formatImage";

export default function PriceTable({ price, viewType }: PriceTable) {
  // 가장 비싼 트레이더 찾는 함수
  const findExpensiveTrader = (traders: TradeOption[]) => {
    if (!traders) return null;
    const filteredTraders = traders.filter(
      (t) => t.trader.npc_id !== "FLEA_MARKET"
    );
    if (filteredTraders.length === 0) return null;
    return filteredTraders.reduce(
      (max, current) => (current.price > max.price ? current : max),
      filteredTraders[0]
    );
  };

  // 플리마켓 가격 찾는 함수
  const findFleaMarketPrice = (traders: TradeOption[]) => {
    if (!traders) return "-";
    const fleaMarket = traders.find((t) => t.trader.npc_id === "FLEA_MARKET");
    return fleaMarket?.price || "-";
  };

  // PVE, PVP 각각의 값 미리 계산
  const pveTraders = price.trader.pve_trader;
  const pvpTraders = price.trader.pvp_trader;

  const expensiveTraderPVE = findExpensiveTrader(pveTraders);
  const expensiveTraderPVP = findExpensiveTrader(pvpTraders);

  const fleaMarketPricePVE = findFleaMarketPrice(pveTraders);
  const fleaMarketPricePVP = findFleaMarketPrice(pvpTraders);

  // 현재 viewType에 맞는 값 선택
  const isPVP = viewType === "PVP";
  const expensiveTrader = isPVP ? expensiveTraderPVP : expensiveTraderPVE;
  const fleaMarketPrice = isPVP ? fleaMarketPricePVP : fleaMarketPricePVE;

  return (
    <div className="grid grid-cols-5 border-b border-white border-2 cursor-pointer hover:bg-NeutralGray">
      <CenterContents>
        <ImageView
          src={price.item_image}
          alt={price.item_name_en}
          popWidth={220}
          popHeight={200}
          size="160px"
          wrapWidth={160}
          wrapHeight={80}
        />
      </CenterContents>

      <CenterContents colSpan="2">
        <TextSpan size="sm">
          {price.item_name_kr || price.item_name_en}
        </TextSpan>
      </CenterContents>

      <CenterContents>
        {expensiveTrader ? (
          <div className="flex gap-4 items-center">
            <ImageView
              src={formatImage(expensiveTrader.trader.npc_image || "")}
              alt={expensiveTrader.trader.npc_name_en || ""}
              popWidth={80}
              popHeight={80}
              size="40px"
              wrapWidth={40}
              wrapHeight={40}
            />
            <TextSpan
              textColor={viewType === "PVP" ? "PeachCream" : "SkyBloom"}
            >
              {expensiveTrader.price}
            </TextSpan>
          </div>
        ) : (
          <TextSpan textColor="gray">-</TextSpan>
        )}
      </CenterContents>

      <CenterContents>
        <TextSpan textColor={viewType === "PVP" ? "PeachCream" : "SkyBloom"}>
          {fleaMarketPrice}
        </TextSpan>
      </CenterContents>
    </div>
  );
}
