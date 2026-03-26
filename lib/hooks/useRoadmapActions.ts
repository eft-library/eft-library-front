"use client";

import type { Dispatch, SetStateAction } from "react";
import { useCallback, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useLocale } from "next-intl";
import { requestUserData } from "@/lib/config/api";
import { USER_API_ENDPOINTS } from "@/lib/config/endpoint";
import { alertMessageI18N } from "@/lib/consts/i18nConsts";
import { getLocaleKey } from "@/lib/func/localeFunction";
import {
  findMatchingNodes,
  getFitBoundsFromNode,
} from "@/lib/func/roadmapGraphFunction";
import type { RoadmapFlowNode } from "@/app/roadmap/_components/roadmap.types";

interface UseRoadmapActionsProps {
  nodes: RoadmapFlowNode[];
  questList: string[];
  searchQuery: string;
  searchIndex: number;
  setQuestList: Dispatch<SetStateAction<string[]>>;
  setSearchIndex: Dispatch<SetStateAction<number>>;
  fitBounds: (bounds: {
    x: number;
    y: number;
    width: number;
    height: number;
  }) => void;
}

export function useRoadmapActions({
  nodes,
  questList,
  searchQuery,
  searchIndex,
  setQuestList,
  setSearchIndex,
  fitBounds,
}: UseRoadmapActionsProps) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const { data: session } = useSession();

  const [alertDesc, setAlertDesc] = useState<string>("");
  const [alertStatus, setAlertStatus] = useState<boolean>(false);

  const openAlert = useCallback((message: string) => {
    setAlertDesc(message);
    requestAnimationFrame(() => {
      setAlertStatus(true);
    });
  }, []);

  const onClickSave = async () => {
    if (session && session.email) {
      const response = await requestUserData<string[]>(
        USER_API_ENDPOINTS.UPDATE_ROADMAP,
        { questList },
        session,
      );
      if (!response) return;

      if (response.status === 200) {
        setQuestList(response.data);
        openAlert(alertMessageI18N.save[localeKey]);
      } else {
        openAlert(alertMessageI18N.reLogin[localeKey]);
        signOut();
        window.location.reload();
      }
    } else {
      openAlert(alertMessageI18N.onlyUser[localeKey]);
    }
  };

  const handleSearch = () => {
    if (searchQuery.length < 1) {
      openAlert(alertMessageI18N.inputWord[localeKey]);
      return;
    }

    const matchingNodes = findMatchingNodes(nodes, searchQuery);

    if (matchingNodes.length > 0) {
      const nextIndex = searchIndex % matchingNodes.length;
      const targetNode = matchingNodes[nextIndex];
      setSearchIndex(nextIndex + 1);
      fitBounds(getFitBoundsFromNode(targetNode));
      return;
    }

    openAlert(alertMessageI18N.notFound[localeKey]);
  };

  return {
    alertDesc,
    alertStatus,
    handleSearch,
    onClickSave,
    setAlertStatus,
  };
}
