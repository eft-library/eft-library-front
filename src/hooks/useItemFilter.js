import { useState } from 'react';
import { ITEM_LIST, ALL_VALUE_LIST } from 'src/utils/itemConstants';

/**
 * 3D 맵에서 화면에 표시할 아이템을 필터링 해주는 함수
 */
export const useItemFilter = () => {
  const [viewItemList, setViewItemList] = useState(ALL_VALUE_LIST);

  /**
   * 아이템 클릭 이벤트
   */
  const onClickItem = (clickValue) => {
    const rootValueList = ITEM_LIST.map((item) => item.value);

    if (rootValueList.includes(clickValue)) {
      handleRootItemClick(clickValue);
    } else {
      handleChildItemClick(clickValue);
    }
  };

  /**
   * 아이템 전체 선택 또는 해제
   */
  const onClickAllItem = (isAll) => {
    setViewItemList(isAll ? ALL_VALUE_LIST : []);
  };

  /**
   * 상위 값 클릭 시
   * viewItemList child가 전부 있는지 확인
   * 전부 있으면 모두 제거, 전부 있지 않으면 모두 추가
   */
  const handleRootItemClick = (clickValue) => {
    const rootList = ITEM_LIST.find((item) => item.value === clickValue);
    const childList = rootList.child.map((childItem) => childItem.value);

    const shouldRemoveAllChild = checkAllChild(viewItemList, childList);

    if (shouldRemoveAllChild) {
      const filteredList = viewItemList.filter(
        (item) => !childList.includes(item),
      );
      setViewItemList(filteredList.filter((item) => item !== clickValue));
    } else {
      const result = [...viewItemList, ...childList];
      result.push(clickValue);
      setViewItemList([...new Set(result)]);
    }
  };

  /**
   * 하위 값 클릭 시
   * viewItemList 해당 값 있는지 확인
   * 있으면 item 제거, 없으면 item 추가
   * root의 모든 아이템 제거 시 root 제거, 모두 추가될 경우 root 추가
   */
  const handleChildItemClick = (clickValue) => {
    const rootList = ITEM_LIST.find((item) =>
      findObjectWithValue(item, clickValue),
    );
    const childList = rootList.child.map((childItem) => childItem.value);

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
        (item) => item !== rootList.value,
      );
    }

    const result = [...new Set(updatedItemList)];
    setViewItemList(result);
  };

  return { viewItemList, onClickItem, onClickAllItem };
};

/**
 * child의 value로 root 찾기
 */
const findObjectWithValue = (obj, value) => {
  // 현재 객체의 value가 주어진 값과 일치하면 현재 객체를 반환
  if (obj.value === value) {
    return obj;
  }

  // 현재 객체에 child 속성이 있다면 해당 배열을 순회하면서 탐색
  if (obj.child) {
    for (const childObj of obj.child) {
      const result = findObjectWithValue(childObj, value);
      // 만약 하위 객체에서 값을 찾았다면 해당 객체 반환
      if (result) {
        return result;
      }
    }
  }

  // 현재 객체와 하위 객체에서 값이 발견되지 않으면 null 반환
  return null;
};

/**
 * 모든 child가 있는지 확인
 * 있으면 true, 없으면 false
 */
const checkAllChild = (itemList, childList) => {
  return childList.every((childValue) => itemList.includes(childValue));
};

/**
 * child가 어느 정도 있는지 요소 판별
 * 모든 child가 있을 때 또는 몇 개의 child만 있을 때: true
 * 모든 child가 없을 때: false
 */
const checkSomeChild = (itemList, childList) => {
  return childList.some((childValue) => itemList.includes(childValue));
};
