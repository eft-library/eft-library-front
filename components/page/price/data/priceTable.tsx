"use client";

import CenterContents from "@/components/custom/gridContents/centerContents";
import type { PriceTable, TradeOption } from "./priceTypes";
import TextSpan from "@/components/custom/gridContents/textSpan";
import { formatImage } from "@/lib/func/formatImage";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function PriceTable({
  price,
  viewType,
  setSelectItem,
  selectItem,
}: PriceTable) {
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
    return fleaMarket?.price ? `${fleaMarket?.price} ₽` : "-";
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
    <div
      onClick={() => setSelectItem(price)}
      className={cn(
        "grid grid-cols-5 border-b border-white cursor-pointer hover:bg-NeutralGray",
        selectItem && selectItem.id === price.id && "bg-NeutralGray"
      )}
    >
      <CenterContents>
        <div
          style={{
            width: `${160}px`,
            height: `${80}px`,
          }}
          className={`flex justify-center items-center relative cursor-pointer`}
        >
          <Image
            src={price.item_image}
            alt={price.item_name_en}
            fill
            sizes={"160px"}
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
      </CenterContents>

      <CenterContents colSpan="2">
        <TextSpan size="sm">
          {price.item_name_kr || price.item_name_en}
        </TextSpan>
      </CenterContents>

      {expensiveTrader ? (
        <div className="flex gap-4 items-center">
          <div
            style={{
              width: `${40}px`,
              height: `${40}px`,
            }}
            className={`flex justify-center items-center relative cursor-pointer`}
          >
            <Image
              src={formatImage(expensiveTrader.trader.npc_image || "")}
              fill
              sizes={"40px"}
              style={{ objectFit: "contain" }}
              alt={expensiveTrader.trader.npc_name_en || ""}
              priority
            />
          </div>
          <TextSpan textColor={isPVP ? "PeachCream" : "SkyBloom"}>
            {expensiveTrader.price}&nbsp;₽
          </TextSpan>
        </div>
      ) : (
        <TextSpan textColor="gray">-</TextSpan>
      )}

      <CenterContents>
        <TextSpan textColor={isPVP ? "PeachCream" : "SkyBloom"}>
          {fleaMarketPrice}
        </TextSpan>
      </CenterContents>
    </div>
  );
}
