import { useEffect, useMemo, useState } from "react";
import { useAppStore } from "@/store/provider";
import type { JpgItemPath, Item } from "@/types/types";
import { fetchDataWithNone } from "@/lib/api";
import API_ENDPOINTS from "@/config/endPoints";
import {
  extractValues,
  findObjectWithValue,
  checkAllChild,
  checkSomeChild,
} from "@/lib/itemFilterUtils";

/**
 * 3D 맵에서 화면에 표시할 아이템을 필터링 해주는 함수
 */
export const useItemFilter = (mapItem: JpgItemPath[]) => {
  const { itemFilter, setItemFilter } = useAppStore((state) => state);
  const [viewItemList, setViewItemList] = useState<string[]>(
    extractValues(itemFilter)
  );

  // itemFilter가 비어있을 때만 데이터를 가져옵니다.
  useEffect(() => {
    if (itemFilter.length === 0) {
      fetchDataWithNone(API_ENDPOINTS.GET_ITEM_FILTER, setItemFilter);
    }
  }, [itemFilter, setItemFilter]);

  // mapItem이 변경될 때마다 viewItemList를 업데이트합니다.
  const valuesList = useMemo(() => {
    const valuesSet = new Set<string>();
    mapItem.forEach((item) => {
      valuesSet.add(item.childValue);
      valuesSet.add(item.motherValue);
    });
    return [...valuesSet];
  }, [mapItem]);

  useEffect(() => {
    if (valuesList.length > 0) {
      setViewItemList(valuesList);
    }
  }, [valuesList]);

  const updateViewItemList = (
    newItems: string[],
    removeItems: string[] = []
  ) => {
    setViewItemList((prev) => {
      const updatedSet = new Set(prev);
      newItems.forEach((item) => updatedSet.add(item));
      removeItems.forEach((item) => updatedSet.delete(item));
      return [...updatedSet];
    });
  };

  /**
   * 아이템 클릭 이벤트
   */
  const onClickItem = (clickValue: string) => {
    const rootValueList = itemFilter.map((item) => item.value);

    if (rootValueList.includes(clickValue)) {
      handleRootItemClick(clickValue);
    } else {
      handleChildItemClick(clickValue);
    }
  };

  /**
   * 아이템 전체 선택 또는 해제
   */
  const onClickAllItem = (isAll: boolean) => {
    setViewItemList(isAll ? [] : valuesList);
  };

  /**
   * 상위 값 클릭 시
   * viewItemList child가 전부 있는지 확인
   * 전부 있으면 모두 제거, 전부 있지 않으면 모두 추가
   */
  const handleRootItemClick = (clickValue: string) => {
    const rootList: Item = itemFilter.find(
      (item) => item.value === clickValue
    )!;
    const childList = rootList.sub.map((childItem) => childItem.value);
    const shouldRemoveAllChild = checkAllChild(viewItemList, childList);
    const newItems = shouldRemoveAllChild ? [] : [...childList, clickValue];
    const removeItems = shouldRemoveAllChild ? [clickValue, ...childList] : [];
    updateViewItemList(newItems, removeItems);
  };

  /**
   * 하위 값 클릭 시
   * viewItemList 해당 값 있는지 확인
   * 있으면 item 제거, 없으면 item 추가
   * root의 모든 아이템 제거 시 root 제거, 모두 추가될 경우 root 추가
   */
  const handleChildItemClick = (clickValue: string) => {
    const rootList: Item = itemFilter.find((item) =>
      findObjectWithValue(item, clickValue)
    )!;

    const childList = rootList.sub.map((childItem) => childItem.value);

    let updatedItemList = viewItemList.includes(clickValue)
      ? viewItemList.filter((item) => item !== clickValue)
      : [...viewItemList, clickValue];

    const isHaveAllChild = checkAllChild(updatedItemList, childList);
    const isHaveAnyMissingChild = checkSomeChild(updatedItemList, childList);

    // 전부 있거나, 몇 개만 있을 경우 root 추가
    if (isHaveAllChild || isHaveAnyMissingChild) {
      updatedItemList.push(rootList.value);
    }

    // 전부 없을 경우 root 제거
    if (!isHaveAnyMissingChild) {
      updatedItemList = updatedItemList.filter(
        (item) => item !== rootList.value
      );
    }

    const result = [...new Set(updatedItemList)];
    setViewItemList(result);
  };

  return { viewItemList, onClickItem, onClickAllItem };
};