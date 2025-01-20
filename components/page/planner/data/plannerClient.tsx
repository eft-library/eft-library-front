"use client";

import { formatImage } from "@/lib/func/formatImage";
import { requestUserData } from "@/lib/config/api";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { USER_API_ENDPOINTS } from "@/lib/config/endpoint";
import { useRouter } from "next/navigation";
import type {
  Planner,
  PlannerClientQuest,
  FetchSchema,
  Quest,
  Require,
} from "./plannerType";
import Image from "next/image";
import PlannerList from "./plannerList";
import PlannerSelector from "./plannerSelector";
import TextSpan from "../../../custom/gridContents/textSpan";
import DefaultAlert from "@/components/custom/alert/defaultAlert";
import { previewData } from "@/lib/consts/libraryConsts";

export default function PlannerClient({ userQuestList }: PlannerClientQuest) {
  const [checkedQuest, setCheckedQuest] = useState<string[]>([]);
  const [previewCheckedQuest, setPreviewCheckedQuest] = useState<string[]>([]);
  const router = useRouter();
  const [indices, setIndices] = useState<number[]>(
    userQuestList.map((_, index) => index)
  );
  const [previewIndices, setPreviewIndices] = useState<number[]>(
    previewData.map((_, index) => index)
  );
  const [userQuest, setUserQuest] = useState<Planner[]>([]);
  const [alertStatus, setAlertStatus] = useState<boolean>(false);
  const [alertDesc, setAlertDesc] = useState<string>("");
  const { data: session } = useSession();

  useEffect(() => {
    setUserQuest(userQuestList);
    setIndices(userQuestList.map((_, index) => index));
  }, [userQuestList]);

  const checkResponse = (response: FetchSchema | null) => {
    if (!response) return;

    if (response.status === 200) {
      setUserQuest(response.data);
      if (response.data.length > 0) {
        setIndices(response.data.map((_, index) => index));
      }
      setCheckedQuest([]);
    } else {
      setAlertStatus(true);
      signOut();
      router.push("/");
    }
  };
  // success
  const successUserQuest = async (quest_id: string, next: Require[]) => {
    if (session && session.email) {
      const onlyQuestIdList = makeOnlyQuestIds();
      const newQuestList = [
        ...onlyQuestIdList.filter((quest) => quest !== quest_id),
        ...next.map((quest) => quest.id),
      ];
      const uniqueQuestList = [...new Set(newQuestList)];

      const response = await requestUserData(
        USER_API_ENDPOINTS.UPDATE_USER_QUEST,
        { userQuestList: uniqueQuestList },
        session
      );

      checkResponse(response);
    } else {
      setAlertDesc("완료는 로그인 사용자만 가능합니다.");
      setTimeout(() => {
        setAlertStatus(true);
      }, 500);
    }
  };

  // delete
  const deleteUserQuest = async (deleteList: string[]) => {
    if (session && session.email) {
      const onlyQuestIdList = makeOnlyQuestIds();
      const newQuestList = onlyQuestIdList.filter(
        (quest_id) => !deleteList.includes(quest_id)
      );

      const response = await requestUserData(
        USER_API_ENDPOINTS.DELETE_USER_QUEST,
        { userQuestList: newQuestList },
        session
      );

      checkResponse(response);
    } else {
      setAlertDesc("삭제는 로그인 사용자만 가능합니다.");
      setTimeout(() => {
        setAlertStatus(true);
      }, 500);
    }
  };

  // update
  const updateUserQuest = async (selectedList: Quest[]) => {
    if (session && session.email) {
      const onlyQuestIdList = makeOnlyQuestIds();
      const onlySelectQuestIdList = selectedList.flatMap((quest) => quest.id);
      const newQuestList = [
        ...new Set([...onlyQuestIdList, ...onlySelectQuestIdList]),
      ];
      const response = await requestUserData(
        USER_API_ENDPOINTS.UPDATE_USER_QUEST,
        { userQuestList: newQuestList },
        session
      );

      checkResponse(response);
    } else {
      setAlertDesc("추가는 로그인 사용자만 가능합니다.");
      setTimeout(() => {
        setAlertStatus(true);
      }, 500);
    }
  };

  const makeOnlyQuestIds = () => {
    const onlyQuestIds = userQuest.flatMap((npc) =>
      npc.quest_info.map((quest) => quest.quest_id)
    );

    return onlyQuestIds.filter((questId) => questId !== null);
  };

  const checkedBox = (quest_id: string, isPreview?: boolean) => {
    if (isPreview) {
      if (previewCheckedQuest.includes(quest_id)) {
        const filterData = previewCheckedQuest.filter((id) => id !== quest_id);
        setPreviewCheckedQuest(filterData);
      } else {
        setPreviewCheckedQuest([...previewCheckedQuest, quest_id]);
      }
    } else {
      if (checkedQuest.includes(quest_id)) {
        const filterData = checkedQuest.filter((id) => id !== quest_id);
        setCheckedQuest(filterData);
      } else {
        setCheckedQuest([...checkedQuest, quest_id]);
      }
    }
  };

  const allCheck = (isPreview?: boolean) => {
    if (isPreview) {
      const onlyQuestIdList = previewData.flatMap((npc) =>
        npc.quest_info.map((quest) => quest.quest_id)
      );
      if (previewCheckedQuest.length === onlyQuestIdList.length) {
        setPreviewCheckedQuest([]);
      } else {
        setPreviewCheckedQuest(onlyQuestIdList);
      }
    } else {
      const onlyQuestIdList = userQuest.flatMap((npc) =>
        npc.quest_info.map((quest) => quest.quest_id)
      );
      if (checkedQuest.length === onlyQuestIdList.length) {
        setCheckedQuest([]);
      } else {
        setCheckedQuest(onlyQuestIdList);
      }
    }
  };

  const checkAllQuest = (isPreview?: boolean) => {
    if (isPreview) {
      const onlyQuestIdList = previewData.flatMap((npc) =>
        npc.quest_info.map((quest) => quest.quest_id)
      );
      return previewCheckedQuest.length === onlyQuestIdList.length;
    } else {
      const onlyQuestIdList = userQuest.flatMap((npc) =>
        npc.quest_info.map((quest) => quest.quest_id)
      );
      return checkedQuest.length === onlyQuestIdList.length;
    }
  };

  return (
    <div className={"w-full h-full"}>
      <PlannerSelector updateQuest={updateUserQuest} />
      {session && session.email ? (
        <>
          {userQuest.length < 1 || !userQuest[0].npc_id ? (
            <TextSpan size="lg" isCenter={false}>
              퀘스트 플래너에 등록할 퀘스트를 검색하여 추가 버튼을 눌러주세요.
            </TextSpan>
          ) : (
            <div>
              {/* 상단 전체 선택 및 삭제 버튼 */}
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="w-6 h-6 border border-white cursor-pointer"
                    checked={checkAllQuest(false)}
                    onChange={() => allCheck(false)}
                  />
                  <TextSpan isCenter={false} size="lg">
                    전체 선택
                  </TextSpan>
                </div>
                <button
                  className="px-4 font-bold py-2 border-2 bg-Background border-white text-white rounded-lg hover:bg-DeepBurgundy"
                  onClick={() => deleteUserQuest(checkedQuest)}
                >
                  삭제
                </button>
              </div>
              {/* 아코디언 리스트 */}
              <div className={"flex flex-col gap-2"}>
                {userQuest.map((npc, index) => (
                  <div key={npc.npc_id} className="border-b-0">
                    <button
                      className="w-full flex items-center justify-between bg-NeutralGray text-white rounded-lg px-4 py-2 mb-2 hover:bg-MutedGray transition"
                      onClick={() => {
                        setIndices((prev) =>
                          prev.includes(index)
                            ? prev.filter((i) => i !== index)
                            : [...prev, index]
                        );
                      }}
                    >
                      <div className={"flex gap-2 items-center"}>
                        <Image
                          src={formatImage(npc.npc_image)}
                          alt={npc.npc_name_en}
                          width={40}
                          height={40}
                          className={"rounded-lg"}
                        />
                        <span className="flex-1 text-left font-bold">
                          {npc.npc_name_kr}
                        </span>
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 transition-transform ${
                          indices.includes(index) ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {indices.includes(index) && (
                      <PlannerList
                        successQuest={successUserQuest}
                        userQuest={npc}
                        checkedQuest={checkedQuest}
                        checkedBox={checkedBox}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div>
          <div className="mb-8">
            <span className="font-bold text-xl text-SoftPink">
              아래에 추가된 퀘스트는 예시이며, 모든 동작은 로그인이 필요합니다.
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="w-6 h-6 border border-white cursor-pointer"
                checked={checkAllQuest(true)}
                onChange={() => allCheck(true)}
              />
              <TextSpan isCenter={false} size="lg">
                전체 선택
              </TextSpan>
            </div>
            <button
              className="px-4 font-bold py-2 border-2 bg-Background border-white text-white rounded-lg hover:bg-DeepBurgundy"
              onClick={() => deleteUserQuest(checkedQuest)}
            >
              삭제
            </button>
          </div>

          {/* 아코디언 리스트 */}
          <div className={"flex flex-col gap-2"}>
            {previewData.map((npc, index) => (
              <div key={npc.npc_id} className="border-b-0">
                <button
                  className="w-full flex items-center justify-between bg-NeutralGray text-white rounded-lg px-4 py-2 mb-2 hover:bg-MutedGray transition"
                  onClick={() => {
                    setPreviewIndices((prev) =>
                      prev.includes(index)
                        ? prev.filter((i) => i !== index)
                        : [...prev, index]
                    );
                  }}
                >
                  <div className={"flex gap-2 items-center"}>
                    <Image
                      src={formatImage(npc.npc_image)}
                      alt={npc.npc_name_en}
                      width={40}
                      height={40}
                      className={"rounded-lg"}
                    />
                    <span className="flex-1 text-left font-bold">
                      {npc.npc_name_kr}
                    </span>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 transition-transform ${
                      previewIndices.includes(index) ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {previewIndices.includes(index) && (
                  <PlannerList
                    successQuest={successUserQuest}
                    userQuest={npc}
                    checkedQuest={previewCheckedQuest}
                    checkedBox={checkedBox}
                    isPreview={true}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      <DefaultAlert
        open={alertStatus}
        setOpen={setAlertStatus}
        title="알림"
        description={alertDesc}
      />
    </div>
  );
}
