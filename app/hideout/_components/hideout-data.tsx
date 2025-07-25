"use client";

import { requestPostData } from "@/lib/config/api";
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

    const getStation = async (email: string) => {
      const data = await requestPostData(API_ENDPOINTS.GET_ALL_STATION, {
        user_email: email,
      });
      if (data && data.status === 200) {
        setStationData(data.data);
      } else {
        console.error(
          "Failed to fetch station data:",
          data?.msg || "Unknown error"
        );
      }
    };

    const userEmail = session?.email || "";
    getStation(userEmail);
  }, [status, session?.email]);

  if (!stationData) return <Loading />;

  return <HideoutView hideoutData={stationData} />;
}
