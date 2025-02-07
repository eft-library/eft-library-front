"use client";

import { useState } from "react";
import PriceList from "./priceList";
import PriceTopChart from "./priceTopChart";
import PriceTab from "./priceTab";

export default function PriceClient() {
  const [tabState, setTabState] = useState("priceList");

  return (
    <>
      <PriceTab tabState={tabState} setTabState={setTabState} />
      {tabState === "priceList" && <PriceList />}
      {tabState === "priceTop" && <PriceTopChart />}
    </>
  );
}
