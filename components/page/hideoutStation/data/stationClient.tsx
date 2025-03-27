"use client";

import type { StationClient } from "./stationType";
import StationDetail from "./stationDetail";
import StationMap from "./stationMap";
import LevelSelector from "./levelSelector";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { requestUserData } from "@/lib/config/api";
import { USER_API_ENDPOINTS } from "@/lib/config/endpoint";
import DefaultAlert from "@/components/custom/alert/defaultAlert";
import Loading from "@/components/custom/loading/loading";
import { Button } from "@/components/ui/button";

export default function StationClient({ hideoutData }: StationClient) {
  const { data: session } = useSession();
  const [completeList, setCompleteList] = useState<string[]>(
    hideoutData.complete_list
  );
  const [master, setMaster] = useState<string>("5d484fe3654e76006657e0ac");
  const [level, setLevel] = useState<string>("5d484fe3654e76006657e0ac-1");
  const [alertDesc, setAlertDesc] = useState<string>("");
  const [alertStatus, setAlertStatus] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setCompleteList(hideoutData.complete_list);
  }, [hideoutData]);

  const onClickSave = async (id: string, type: string) => {
    if (session && session.email) {
      const masterId = id.split("-")[0];
      const masterInfo = hideoutData.hideout_info.find(
        (station) => station.master_id === masterId
      );
      const allList = masterInfo?.data.map((sub) => sub.level_id);
      const downList = masterInfo?.data
        .map((sub) => sub.level_id)
        .filter((idValue) => idValue <= id);

      const upList = masterInfo?.data
        .map((sub) => sub.level_id)
        .filter((idValue) => idValue >= id);

      let changeList: string[] = [];

      if (type === "complete") {
        if (downList) {
          changeList = [
            ...completeList,
            ...downList.filter((item) => !completeList.includes(item)),
          ];
        }
      } else {
        if (upList) {
          changeList = [
            ...completeList.filter((item) => !upList.includes(item)),
          ];
        }
      }

      setLoading(true);
      const response = await requestUserData(
        USER_API_ENDPOINTS.UPDATE_STATION,
        { complete_list: changeList },
        session
      );
      setLoading(false);
      if (!response) return;

      if (response.status === 200) {
        setCompleteList(changeList);
        setAlertDesc("저장 되었습니다.");

        setTimeout(() => {
          setAlertStatus(true);
        }, 500);
        setLoading(false);

        if (type === "complete") {
          const nextValue = `${masterId}-${parseInt(id.split("-")[1], 10) + 1}`;
          if (allList?.includes(nextValue)) {
            setLevel(nextValue);
          }
        } else {
          const prevValue = `${masterId}-${parseInt(id.split("-")[1], 10) - 1}`;
          if (allList?.includes(prevValue)) {
            setLevel(prevValue);
          }
        }
      } else {
        setCompleteList([]);
        setAlertDesc("로그인을 다시 해주세요.");

        setTimeout(() => {
          setAlertStatus(true);
        }, 500);
        setLoading(false);
        signOut();
        window.location.reload();
      }
    } else {
      setAlertDesc("은신처는 로그인 사용자만 저장 가능합니다.");
      setTimeout(() => {
        setAlertStatus(true);
      }, 500);
      setLoading(false);
    }
  };

  const onClickChangeMaster = (masterId: string) => {
    setMaster(masterId);

    const masterInfo = hideoutData.hideout_info.find(
      (station) => station.master_id === masterId
    );

    const allList = masterInfo?.data.map((sub) => sub.level_id) || [];

    const filtered = completeList
      .filter((item) => item.startsWith(masterId + "-"))
      .map((item) => parseInt(item.split("-")[1], 10));

    if (filtered.length === 0) {
      setLevel(masterId + "-1");
    } else {
      const nextValue = `${masterId}-${Math.max(...filtered) + 1}`;
      if (allList?.includes(nextValue)) {
        setLevel(nextValue);
      } else {
        setLevel(`${masterId}-${Math.max(...filtered)}`);
      }
    }
  };

  const onClickReset = async () => {
    setLoading(true);
    const response = await requestUserData(
      USER_API_ENDPOINTS.UPDATE_STATION,
      { complete_list: [] },
      session
    );
    setLoading(false);
    if (!response) return;

    setMaster("5d484fe3654e76006657e0ac-1");
    setLevel("5d484fe3654e76006657e0ac-1");
    if (response.status === 200) {
      setCompleteList([]);
      setAlertDesc("저장 되었습니다.");
      setTimeout(() => {
        setAlertStatus(true);
      }, 500);
      setLoading(false);
    } else {
      setCompleteList([]);
      setAlertDesc("로그인을 다시 해주세요.");
      setTimeout(() => {
        setAlertStatus(true);
      }, 500);
      setLoading(false);
      signOut();
      window.location.reload();
    }
  };

  return (
    <div className="w-full flex flex-col">
      {isLoading && <Loading />}
      <div className="w-full flex justify-center relative">
        <StationMap
          masterId={master}
          onChangeMaster={onClickChangeMaster}
          completeList={completeList}
        />
        <LevelSelector
          masterId={master}
          selectLevelId={level}
          hideoutData={hideoutData}
          onChangeLevel={setLevel}
        />
        {session && session.email && (
          <div className="w-[100px] absolute bottom-20 left-0">
            <Button
              onClick={() => onClickReset()}
              className="rounded-lg font-bold text-base text-white bg-Background border-white border-solid border-2 hover:bg-NeutralGray"
            >
              은신처 초기화
            </Button>
          </div>
        )}
      </div>
      <StationDetail
        levelId={level}
        hideoutData={hideoutData}
        onClickSave={onClickSave}
        complete_list={completeList}
      />

      <DefaultAlert
        open={alertStatus}
        setOpen={setAlertStatus}
        title="알림"
        description={alertDesc}
      />
    </div>
  );
}
