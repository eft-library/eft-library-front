"use client";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { alertMessageI18N, planner18N } from "@/lib/consts/i18nConsts";
import type { Planner, PlannerViewTypes } from "./planner.types";
import SearchFilter from "./SearchFilter/search-filter";
import type { Quest, TaskWrapper } from "@/app/quest/_components/quest.types";
import { useEffect, useState } from "react";
import PreviewSelect from "./PreviewSelect/preview-select";
import { useSession } from "next-auth/react";
import { Search, Trash2 } from "lucide-react";
import PlannerCard from "./PlannerCard/planner-card";
import { requestUserData } from "@/lib/config/api";
import { USER_API_ENDPOINTS } from "@/lib/config/endpoint";
import { Button } from "@/components/ui/button";
import DefaultDialog from "@/components/custom/DefaultDialog/default-dialog";
import { plannerSampleData } from "@/lib/consts/libraryConsts";

export default function PlannerView({ userQuestList }: PlannerViewTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const [selectedItems, setSelectedItems] = useState<Quest[]>([]);
  const [userQuest, setUserQuest] = useState<Planner[]>([]);
  const { data: session } = useSession();
  const [alertDesc, setAlertDesc] = useState<string>("");
  const [alertStatus, setAlertStatus] = useState<boolean>(false);

  // NPC 열림/닫힘 상태 관리
  const [openNPCs, setOpenNPCs] = useState<Record<string, boolean>>({});

  // 선택된 활성 퀘스트들
  const [selectedActiveQuests, setSelectedActiveQuests] = useState<string[]>(
    []
  );

  useEffect(() => {
    setUserQuest(userQuestList);
    // 초기 NPC 상태 설정 (모두 닫힌 상태로 시작)
    const initialOpenState = userQuestList.reduce((acc, npc) => {
      acc[npc.npc_id] = false;
      return acc;
    }, {} as Record<string, boolean>);
    setOpenNPCs(initialOpenState);
  }, [userQuestList]);

  const removeSelected = (quest: Quest) => {
    setSelectedItems(
      selectedItems.filter((originQuest) => originQuest.id !== quest.id)
    );
  };

  const makeOnlyQuestIds = () => {
    const onlyQuestIds = userQuest.flatMap((npc) =>
      npc.quest_info.map((quest) => quest.quest_id)
    );
    return onlyQuestIds.filter((questId) => questId !== null);
  };

  // NPC 토글 함수
  const toggleNPC = (npcId: string) => {
    setOpenNPCs((prev) => ({
      ...prev,
      [npcId]: !prev[npcId],
    }));
  };

  // NPC 선택 토글 함수
  const toggleNPCSelection = (npc: Planner) => {
    const npcQuestIds = npc.quest_info.map((quest) => quest.quest_id);
    const allSelected = npcQuestIds.every((id) =>
      selectedActiveQuests.includes(id)
    );

    if (allSelected) {
      // 모든 퀘스트가 선택되어 있으면 모두 해제
      setSelectedActiveQuests((prev) =>
        prev.filter((id) => !npcQuestIds.includes(id))
      );
    } else {
      // 일부 또는 아무것도 선택되지 않았으면 모두 선택
      setSelectedActiveQuests((prev) => {
        const newSelected = [...prev];
        npcQuestIds.forEach((id) => {
          if (!newSelected.includes(id)) {
            newSelected.push(id);
          }
        });
        return newSelected;
      });
    }
  };

  // 활성 퀘스트 선택 토글 함수
  const toggleActiveQuestSelection = (questId: string) => {
    setSelectedActiveQuests((prev) => {
      if (prev.includes(questId)) {
        return prev.filter((id) => id !== questId);
      } else {
        return [...prev, questId];
      }
    });
  };

  // NPC별 선택 상태 계산 함수
  const getNPCSelectionState = (npc: Planner) => {
    const npcQuestIds = npc.quest_info.map((quest) => quest.quest_id);
    const selectedCount = npcQuestIds.filter((id) =>
      selectedActiveQuests.includes(id)
    ).length;

    return selectedCount === npcQuestIds.length && npcQuestIds.length > 0;
  };

  // delete
  const deleteUserQuest = async () => {
    if (session && session.email) {
      const onlyQuestIdList = makeOnlyQuestIds();
      const newQuestList = onlyQuestIdList.filter(
        (quest_id) => !selectedActiveQuests.includes(quest_id)
      );

      const response = await requestUserData(
        USER_API_ENDPOINTS.DELETE_USER_QUEST,
        { userQuestList: newQuestList },
        session
      );
      if (response?.status === 200) {
        setUserQuest(response.data);
        setSelectedActiveQuests([]);
      } else {
        setSelectedActiveQuests([]);
        setUserQuest([]);
      }
    } else {
      setAlertDesc(alertMessageI18N.onlyUser[localeKey]);
      requestAnimationFrame(() => {
        setAlertStatus(true);
      });
    }
  };

  // success
  const successUserQuest = async (quest_id: string, next: TaskWrapper[]) => {
    if (session && session.email) {
      const onlyQuestIdList = makeOnlyQuestIds();
      const newQuestList = [
        ...onlyQuestIdList.filter((quest) => quest !== quest_id),
        ...next.map((quest) => quest.task.id),
      ];
      const uniqueQuestList = [...new Set(newQuestList)];

      const response = await requestUserData(
        USER_API_ENDPOINTS.UPDATE_USER_QUEST,
        { userQuestList: uniqueQuestList },
        session
      );
      if (response?.status === 200) {
        setUserQuest(response.data);
      } else {
        setUserQuest([]);
      }
    } else {
      setAlertDesc(alertMessageI18N.onlyUser[localeKey]);
      requestAnimationFrame(() => {
        setAlertStatus(true);
      });
    }
  };

  // update
  const updateUserQuest = async () => {
    if (session && session.email) {
      const onlyQuestIdList = makeOnlyQuestIds();
      const onlySelectQuestIdList = selectedItems.flatMap((quest) => quest.id);
      const newQuestList = [
        ...new Set([...onlyQuestIdList, ...onlySelectQuestIdList]),
      ];
      const response = await requestUserData(
        USER_API_ENDPOINTS.UPDATE_USER_QUEST,
        { userQuestList: newQuestList },
        session
      );

      if (response?.status === 200) {
        setUserQuest(response.data);
      } else {
        setUserQuest([]);
      }
    } else {
      setAlertDesc(alertMessageI18N.onlyUser[localeKey]);
      requestAnimationFrame(() => {
        setAlertStatus(true);
      });
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 dark:bg-gray-900 bg-gray-50`}
    >
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            {planner18N.title[localeKey]}
          </h1>
        </div>

        {/* 퀘스트 검색 */}
        <SearchFilter
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
        />

        {/* 선택된 퀘스트 미리보기 */}
        {selectedItems.length > 0 && (
          <PreviewSelect
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            removeSelected={removeSelected}
            updateQuest={updateUserQuest}
          />
        )}

        {/* 퀘스트 진행 목록 */}
        {session && session.email ? (
          userQuest.length > 0 && userQuest[0].npc_id ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {planner18N.questProgressList[localeKey]}
                </h2>
                <div className="h-10 flex items-center">
                  {/* 고정 높이 컨테이너 */}
                  <Button
                    variant="destructive"
                    onClick={() => deleteUserQuest()}
                    className={`group relative overflow-hidden rounded-xl cursor-pointer bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all duration-200 hover:-translate-y-0.5 hover:scale-105 ${
                      selectedActiveQuests.length > 0
                        ? "opacity-100 visible"
                        : "opacity-0 invisible pointer-events-none"
                    }`}
                  >
                    {/* Hover overlay effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    <Trash2 className="h-4 w-4 relative z-10 group-hover:rotate-12 transition-transform duration-200" />
                    <span className="relative z-10">
                      {planner18N.delete[localeKey]} (
                      {selectedActiveQuests.length})
                    </span>
                  </Button>
                </div>
              </div>
              {userQuest.map((npc) => (
                <PlannerCard
                  key={npc.npc_id}
                  npcInfo={npc}
                  openNPCs={openNPCs}
                  toggleNPC={toggleNPC}
                  allNPCSelected={getNPCSelectionState(npc)}
                  toggleNPCSelection={toggleNPCSelection}
                  selectedActiveQuests={selectedActiveQuests}
                  toggleActiveQuestSelection={toggleActiveQuestSelection}
                  successUserQuest={successUserQuest}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-600 mb-4">
                <Search className="h-16 w-16 mx-auto mb-4" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {planner18N.noActiveQuest[localeKey]}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {planner18N.notice[localeKey]}
              </p>
            </div>
          )
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {planner18N.questProgressList[localeKey]}
              </h2>
            </div>
            {plannerSampleData.map((sample) => (
              <PlannerCard
                key={sample.npc_id}
                npcInfo={sample}
                openNPCs={openNPCs}
                toggleNPC={toggleNPC}
                allNPCSelected={getNPCSelectionState(sample)}
                toggleNPCSelection={toggleNPCSelection}
                selectedActiveQuests={selectedActiveQuests}
                toggleActiveQuestSelection={toggleActiveQuestSelection}
                successUserQuest={successUserQuest}
              />
            ))}
          </div>
        )}
      </div>
      <DefaultDialog
        open={alertStatus}
        setOpen={setAlertStatus}
        title="Notice"
        description={alertDesc}
      />
    </div>
  );
}
