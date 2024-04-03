/**
 * 3D 지도에서 화면에 표시할 아이템을 필터링 해주는 함수
 */
import { useState } from 'react';
import { ItemList } from 'src/utils/itemConstants';

export const useItemFilter = () => {
  // root, child value 리스트
  const itemValues = ItemList.reduce((acc, item) => {
    acc.push(item.value);
    item.child.forEach((child) => acc.push(child.value));
    return acc;
  }, []);

  // root value 리스트
  const itemRootValues = ItemList.map((item) => item.value);

  // child value 리스트
  const itemChildValues = ItemList.map((item) =>
    item.child.map((childItem) => childItem.value),
  ).flat();

  console.log(itemValues);
  console.log(itemRootValues);
  console.log(itemChildValues);

  const [viewItemList, setViewItemList] = useState(itemValues);

  // 클릭시 생기거나 사라짐
  const onClickItem = (itemValue) => {
    // 클릭한 것이 상위 값일 경우 - 전부 없거나, 1개라도 없을 경우 전체 추가 || 상위에 전부 있을 경우 전부 제거
    // 클릭한 것이 이미 있을 경우 - 제거
    // 클릭한 것이 없을 경우 - 추가
    // if (viewItemList.includes(itemValue)) {
    //   setViewItemList(viewItemList.filter((item) => item !== itemValue));
    // } else {
    //   setViewItemList([...viewItemList, itemValue]);
    // }

    if (itemChildValues.includes(itemValue)) {
      setViewItemList(viewItemList.filter((item) => item !== itemValue));
    } else if (!itemChildValues.includes(itemValue)) {
      setViewItemList([...viewItemList, itemValue]);
    }
  };

  return { viewItemList, onClickItem };
};

// 클릭한 것이 상위 값인지 확인
// 1. viewItemList에 해당 값의 child value가 전부 있는지 확인
// 1-2. 전부 있으면 모두 제거 - root value, child value
// 1-3. 전부 있지 않으면 모두 추가 - root value, child value
// 클릭한 것이 하위 값인지 확인
// 1. viewItemList에 해당 값 있는지 확인
// 1-2. 있으면 제거 - child value
// 1-3. 없으면 추가
