"use client";

import { requestGetUserData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Loading from "@/components/custom/Loading/loading";
import HideoutView from "./hideout-view";

export default function HideoutData() {
  const { data: session, status } = useSession();
  const [stationData, setStationData] = useState();

  useEffect(() => {
    if (status === "loading") return;

    const getStation = async () => {
      const data = await requestGetUserData(API_ENDPOINTS.GET_ALL_STATION, session);
      if (data && data.status === 200) {
        setStationData(data.data);
      } else {
        console.error(
          "Failed to fetch station data:",
          data?.msg || "Unknown error"
        );
      }
    };
    getStation();
  }, [status, session?.email]);

  if (!stationData) return <Loading />;

  return <HideoutView hideoutData={stationData} />;
}
