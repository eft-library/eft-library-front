"use client";

import { useState } from "react";
import PriceList from "./priceList/priceList";
import PriceTab from "./priceTab";
import RankDetail from "./priceRank/rankDetail";

export default function PriceClient() {
  const [tabState, setTabState] = useState("priceList");

  return (
    <>
      <PriceTab tabState={tabState} setTabState={setTabState} />
      {tabState === "priceList" && <PriceList />}
      {tabState === "priceRank" && <RankDetail />}
    </>
  );
}
