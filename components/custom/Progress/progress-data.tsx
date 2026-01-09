"use client";

import { requestGetUserData } from "@/lib/config/api";
import { USER_API_ENDPOINTS } from "@/lib/config/endpoint";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import type { Progress } from "./progress.types";
import ProgressView from "./progress-view";
import { useEffect, useState } from "react";

export default function ProgressData() {
  const { data: session } = useSession();
  const [progressData, setProgressData] = useState<Progress | null>(null);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const data = await requestGetUserData(
          USER_API_ENDPOINTS.GET_USER_PROGRESS,
          session
        );
        if (!data || data.status !== 200)
          throw new Error(data?.msg || "Failed to fetch progress");
        setProgressData(data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProgress();
  }, [session]);

  if (!progressData) return <div></div>;

  return <ProgressView progress={progressData} />;
}
