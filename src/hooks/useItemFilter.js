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
    // root value 리스트
    const rootValueList = ITEM_LIST.map((item) => item.value);

    if (rootValueList.includes(clickValue)) {
      handleRootItemClick(clickValue);
    } else {
      handleChildItemClick(clickValue);
    }
  };

  /**
   * 상위 값 클릭 시
   * viewItemList child가 전부 있는지 확인
   * 전부 있으면 모두 제거, 전부 있지 않으면 모두 추가
   */
  const handleRootItemClick = (clickValue) => {
    const rootList = ITEM_LIST.find((item) => item.value === clickValue);
    const childList = rootList.child.map((childItem) => childItem.value);

    const shouldRemoveAllChild = childList.every((childValue) =>
      viewItemList.includes(childValue),
    );

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
   * root의 모든 아이템 제거 시 root 제거
   */
  const handleChildItemClick = (clickValue) => {
    const updatedItemList = viewItemList.includes(clickValue)
      ? viewItemList.filter((item) => item !== clickValue)
      : [...viewItemList, clickValue];
    setViewItemList(updatedItemList);
  };

  return { viewItemList, onClickItem };
};
