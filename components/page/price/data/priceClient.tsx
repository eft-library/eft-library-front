"use client";

// import { useState } from "react";
import PriceList from "./priceList";
// import PriceTab from "./priceTab";

export default function PriceClient() {
  // const [tabState, setTabState] = useState("priceList");

  return (
    <>
      <PriceList />
      {/* <PriceTab tabState={tabState} setTabState={setTabState} />
      {tabState === "priceList" && <PriceList />}
      {tabState === "priceTop" && <></>} */}
    </>
  );
}
