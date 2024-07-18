"use client";

import PageParent from "@/components/pageParent/pageParent";
import SubHeader from "@/components/subHeader/subHeader";
import UserQuestDetail from "./contents/userQuestDetail";
import type { UserQuest } from "@/types/types";
import "@/assets/quest.css";

export default function UserQuest() {
  return (
    <PageParent>
      <SubHeader title="퀘스트 플래너" />
      <UserQuestDetail />
    </PageParent>
  );
}
