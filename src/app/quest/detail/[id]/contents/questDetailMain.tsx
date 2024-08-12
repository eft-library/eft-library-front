"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import QuestInfo from "./questInfo";
import QuestContents from "./questContents";
import "@/assets/quest.css";
import type { Quest } from "@/types/types";
import PageParent from "@/components/pageParent/pageParent";

export default function QuestDetailMain() {
  const param = useParams<{ id: string }>();
  const [questDetail, setQuestDetail] = useState<Quest>();
  useEffect(() => {
    fetchDataWithNone(`${API_ENDPOINTS.GET_QUEST}/${param.id}`, setQuestDetail);
  }, [param]);

  return (
    <PageParent>
      <QuestInfo quest={questDetail} />
      <QuestContents quest={questDetail} />
    </PageParent>
  );
}
