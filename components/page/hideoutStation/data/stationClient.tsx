"use client";

import type { StationClient } from "./stationType";
import StationDetail from "./stationDetail";
import StationMap from "./stationMap";
import LevelSelector from "./levelSelector";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { requestUserData } from "@/lib/config/api";
import { USER_API_ENDPOINTS } from "@/lib/config/endpoint";
import DefaultAlert from "@/components/custom/alert/defaultAlert";

export default function StationClient({ hideoutData }: StationClient) {
  const { data: session } = useSession();
  const [master, setMaster] = useState<string>("5d484fe3654e76006657e0ac");
  const [level, setLevel] = useState<string>("5d484fe3654e76006657e0ac-1");
  const [alertDesc, setAlertDesc] = useState<string>("");
  const [alertStatus, setAlertStatus] = useState<boolean>(false);

  const onClickSave = async (id: string, type: string) => {
    if (session && session.email) {
      const masterId = id.split("-")[0];
      const masterInfo = hideoutData.hideout_info.find(
        (station) => station.master_id === masterId
      );
      const subList = masterInfo?.data
        .map((sub) => sub.level_id)
        .filter((idValue) => idValue <= id);

      if (subList) {
        let changeList = [];
        if (type === "complete") {
          changeList = [
            ...hideoutData.complete_list,
            ...subList.filter(
              (item) => !hideoutData.complete_list.includes(item)
            ),
          ];
        } else {
          changeList = hideoutData.complete_list.filter(
            (item) => !subList.includes(item)
          );
        }

        const response = await requestUserData(
          USER_API_ENDPOINTS.UPDATE_STATION,
          { complete_list: changeList },
          session
        );
        if (!response) return;

        if (response.status === 200) {
          setAlertDesc("저장 되었습니다.");

          setTimeout(() => {
            setAlertStatus(true);
          }, 500);
        } else {
          setAlertDesc("로그인을 다시 해주세요.");

          setTimeout(() => {
            setAlertStatus(true);
          }, 500);
          signOut();
          window.location.reload();
        }
      }
    } else {
      setAlertDesc("은신처는 로그인 사용자만 저장 가능합니다.");
      setTimeout(() => {
        setAlertStatus(true);
      }, 500);
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex justify-center relative">
        <StationMap
          masterId={master}
          onChangeMaster={setMaster}
          completeList={hideoutData.complete_list}
        />
        <LevelSelector
          masterId={master}
          hideoutData={hideoutData}
          onChangeLevel={setLevel}
        />
      </div>
      <StationDetail
        levelId={level}
        hideoutData={hideoutData}
        onClickSave={onClickSave}
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
