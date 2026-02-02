"use client";

import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { useParams } from "next/navigation";
import type { StoryTypes } from "./story-types";
import Loading from "@/components/custom/Loading/loading";
import { useQuery } from "@tanstack/react-query";
import StoryView from "./story-detail-view";

export default function StoryDetailData() {
  const { id } = useParams<{ id: string }>();

  const fetchStoryData = async (id: string): Promise<StoryTypes> => {
    const res = await fetch(`${API_ENDPOINTS.GET_STORY}/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch story data");
    }
    const json = await res.json();

    if (json.status !== 200) {
      throw new Error(json.msg || "Unknown error");
    }

    return json.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["storyData", id],
    queryFn: () => fetchStoryData(id),
    enabled: !!id,
  });

  if (isLoading) return <Loading />;

  if (error) {
    console.error(error);
    return <div>데이터를 불러오는 데 실패했습니다.</div>;
  }

  if (!data) return <div />;

  return <StoryView story={data} />;
}
