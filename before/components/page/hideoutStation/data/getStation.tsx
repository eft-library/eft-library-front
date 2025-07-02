"use client";

import { requestPostData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import StationClient from "./stationClient";
import Loading from "@/components/custom/loading/loading";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function GetStation() {
  const { data: session } = useSession();
  const [stationData, setStationData] = useState();

  useEffect(() => {
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

    if (session?.email) {
      getStation(session.email);
    } else {
      getStation("");
    }
  }, [session?.email]);

  if (!stationData) return <Loading />;
  return <StationClient hideoutData={stationData} />;
}
