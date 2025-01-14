"use client";

import { formatImage } from "@/lib/func/formatImage";
import { requestUserData } from "@/lib/config/api";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { USER_API_ENDPOINTS } from "@/lib/config/endpoint";
import { useRouter } from "next/navigation";
import type {
  UserQuest,
  UserClientQuest,
  FetchSchema,
  Quest,
  Require,
} from "@/components/page/userQuest/data/userQuestType";
import Image from "next/image";
import UserQuestList from "@/components/page/userQuest/data/userQuestList";
import UserQuestSelector from "./userQuestSelector";
import TextSpan from "../../../custom/gridContents/textSpan";
import DefaultAlert from "@/components/custom/alert/defaultAlert";

export default function UserQuestClient({ userQuestList }: UserClientQuest) {
  const [checkedQuest, setCheckedQuest] = useState<string[]>([]);
  const router = useRouter();
  const [indices, setIndices] = useState<number[]>([0]);
  const [userQuest, setUserQuest] = useState<UserQuest[]>(userQuestList);
  const [alertStatus, setAlertStatus] = useState<boolean>(false);
  const { data: session } = useSession();

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
  };

  // delete
  const deleteUserQuest = async (deleteList: string[]) => {
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
  };

  // update
  const updateUserQuest = async (selectedList: Quest[]) => {
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
  };

  const makeOnlyQuestIds = () => {
    const onlyQuestIds = userQuest.flatMap((npc) =>
      npc.quest_info.map((quest) => quest.quest_id)
    );

    return onlyQuestIds.filter((questId) => questId !== null);
  };

  const checkedBox = (quest_id: string) => {
    if (checkedQuest.includes(quest_id)) {
      const filterData = checkedQuest.filter((id) => id !== quest_id);
      setCheckedQuest(filterData);
    } else {
      setCheckedQuest([...checkedQuest, quest_id]);
    }
  };

  const allCheck = () => {
    const onlyQuestIdList = userQuest.flatMap((npc) =>
      npc.quest_info.map((quest) => quest.quest_id)
    );
    if (checkedQuest.length === onlyQuestIdList.length) {
      setCheckedQuest([]);
    } else {
      setCheckedQuest(onlyQuestIdList);
    }
  };

  const checkAllQuest = () => {
    const onlyQuestIdList = userQuest.flatMap((npc) =>
      npc.quest_info.map((quest) => quest.quest_id)
    );
    return checkedQuest.length === onlyQuestIdList.length;
  };

  return (
    <div className={"w-full h-full"}>
      <UserQuestSelector updateQuest={updateUserQuest} />
      {userQuest.length < 0 || !userQuest[0].npc_id ? (
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
                checked={checkAllQuest()}
                onChange={allCheck}
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
                  <UserQuestList
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

      <DefaultAlert
        open={alertStatus}
        setOpen={setAlertStatus}
        title="알림"
        description="로그인을 다시 해주세요."
      />
    </div>
  );
}
