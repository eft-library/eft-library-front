"use client";

import { getLocaleKey } from "@/lib/func/localeFunction";
import { signOut, useSession } from "next-auth/react";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";
import type {
  HideoutViewTypes,
  UserItemTypes,
  ItemRequireInfoTypes,
} from "./hideout.types";
import { requestUserData } from "@/lib/config/api";
import { USER_API_ENDPOINTS } from "@/lib/config/endpoint";
import { alertMessageI18N, hideoutI18n } from "@/lib/consts/i18nConsts";
import StationMap from "./StationMap/station-map";
import DefaultDialog from "@/components/custom/DefaultDialog/default-dialog";
import HideoutDetail from "./HideoutDetail/hideout-detail";
import Loading from "@/components/custom/Loading/loading";
import ViewWrapper from "@/components/custom/ViewWrapper/view-wrapper";
import AdBanner from "@/components/custom/Adsense/ad-banner";

export default function HideoutView({ hideoutData }: HideoutViewTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const { data: session } = useSession();

  const [completeList, setCompleteList] = useState<string[]>(
    hideoutData.complete_list
  );
  const [userItemList, setUserItemList] = useState<UserItemTypes[]>(
    hideoutData.item_list
  );
  const [allItemList, setAllItemList] = useState<ItemRequireInfoTypes[]>(
    hideoutData.item_require_info
  );
  const [master, setMaster] = useState<string>("5d484fcd654e7668ec2ec322");
  const [level, setLevel] = useState<string>("5d484fcd654e7668ec2ec322-1");
  const [alertDesc, setAlertDesc] = useState<string>("");
  const [alertStatus, setAlertStatus] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setCompleteList(hideoutData.complete_list);
    setUserItemList(hideoutData.item_list);
    setAllItemList(hideoutData.item_require_info);
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
        setAllItemList(response.data.item_require_info);
        setAlertDesc(alertMessageI18N.save[localeKey]);

        requestAnimationFrame(() => {
          setAlertStatus(true);
        });
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
        setAlertDesc(alertMessageI18N.reLogin[localeKey]);

        requestAnimationFrame(() => {
          setAlertStatus(true);
        });
        setLoading(false);
        signOut();
        window.location.reload();
      }
    } else {
      setAlertDesc(alertMessageI18N.onlyUser[localeKey]);
      requestAnimationFrame(() => {
        setAlertStatus(true);
      });
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
    if (session && session.email) {
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
        setAllItemList(response.data.item_require_info);
        setAlertDesc(alertMessageI18N.save[localeKey]);
        requestAnimationFrame(() => {
          setAlertStatus(true);
        });
        setLoading(false);
      } else {
        setCompleteList([]);
        setAlertDesc(alertMessageI18N.reLogin[localeKey]);
        requestAnimationFrame(() => {
          setAlertStatus(true);
        });
        setLoading(false);
        signOut();
        window.location.reload();
      }
    } else {
      setAlertDesc(alertMessageI18N.onlyUser[localeKey]);
      requestAnimationFrame(() => {
        setAlertStatus(true);
      });
      setLoading(false);
    }
  };

  const onClickResetItem = async () => {
    if (session && session.email) {
      setLoading(true);
      const response = await requestUserData(
        USER_API_ENDPOINTS.UPDATE_STATION_ITEM,
        { user_item_list: [] },
        session
      );
      setLoading(false);
      if (!response) return;

      setUserItemList([]);
      if (response.status === 200) {
        setAlertDesc(alertMessageI18N.save[localeKey]);
        requestAnimationFrame(() => {
          setAlertStatus(true);
        });
        setLoading(false);
      } else {
        setAlertDesc(alertMessageI18N.reLogin[localeKey]);
        requestAnimationFrame(() => {
          setAlertStatus(true);
        });
        setLoading(false);
        signOut();
        window.location.reload();
      }
    } else {
      setAlertDesc(alertMessageI18N.onlyUser[localeKey]);
      requestAnimationFrame(() => {
        setAlertStatus(true);
      });
      setLoading(false);
    }
  };

  const onClickSaveItem = async () => {
    if (session && session.email) {
      setLoading(true);
      const response = await requestUserData(
        USER_API_ENDPOINTS.UPDATE_STATION_ITEM,
        { user_item_list: userItemList },
        session
      );
      setLoading(false);
      if (!response) return;

      if (response.status === 200) {
        setAlertDesc(alertMessageI18N.save[localeKey]);
        requestAnimationFrame(() => {
          setAlertStatus(true);
        });
        setLoading(false);
      } else {
        setAlertDesc(alertMessageI18N.reLogin[localeKey]);
        requestAnimationFrame(() => {
          setAlertStatus(true);
        });
        setLoading(false);
        signOut();
        window.location.reload();
      }
    } else {
      setAlertDesc(alertMessageI18N.onlyUser[localeKey]);
      requestAnimationFrame(() => {
        setAlertStatus(true);
      });
      setLoading(false);
    }
  };

  return (
    <ViewWrapper>
      <div className="min-h-screen dark:bg-[#1e2124] dark:text-white bg-gray-50 text-black">
        <div className="container mx-auto px-4 py-8">
          <div className="flex-grow text-center mb-4">
            <h1 className="text-3xl font-bold">
              {hideoutI18n.title[localeKey]}
            </h1>
          </div>
          <AdBanner
            dataAdFormat={"auto"}
            dataFullWidthResponsive={true}
            dataAdSlot="2690838054"
            maxWidth={1220}
          />
          <div className="flex gap-8 mt-4">
            {/* Main Content Area */}
            <div className="flex-1 max-w-7xl mx-auto">
              {/* Hideout Tree */}
              <div className="mb-8">
                <StationMap
                  masterId={master}
                  hideoutInfo={hideoutData.hideout_info}
                  userItemList={userItemList}
                  itemRequireInfo={allItemList}
                  onChangeMaster={onClickChangeMaster}
                  completeList={completeList}
                  onClickReset={onClickReset}
                  onClickResetItem={onClickResetItem}
                  setUserItemList={setUserItemList}
                  onClickSaveItem={onClickSaveItem}
                />
              </div>

              {/* Facility Details */}
              <HideoutDetail
                levelId={level}
                hideoutData={hideoutData}
                onClickSave={onClickSave}
                complete_list={completeList}
                onChangeLevel={setLevel}
              />
            </div>
          </div>
        </div>

        <DefaultDialog
          open={alertStatus}
          setOpen={setAlertStatus}
          title="Notice"
          description={alertDesc}
        />
        {isLoading && <Loading />}
      </div>
    </ViewWrapper>
  );
}
