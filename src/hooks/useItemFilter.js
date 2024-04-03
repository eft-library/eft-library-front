/**
 * 3D 지도에서 화면에 표시할 아이템을 필터링 해주는 함수
 */
import { useState } from 'react';
import { ItemList } from 'src/utils/itemConstants';

export const useItemFilter = () => {
  // root, child value 전부 꺼내서 리스트로 만들기
  const itemValues = ItemList.reduce((acc, item) => {
    acc.push(item.value);
    item.child.forEach((child) => acc.push(child.value));
    return acc;
  }, []);

  // root value만 리스트로 만들기
  const itemRootValues = ItemList.map((item) => item.value);

  console.log(itemValues);
  console.log(itemRootValues);
  const [viewItemList, setViewItemList] = useState(itemValues);

  // 클릭시 생기거나 사라짐
  const onClickItem = (itemValue) => {
    // 클릭한 것이 상위 값일 경우 - 전부 없거나, 1개라도 없을 경우 전체 추가 || 상위에 전부 있을 경우 전부 제거
    // 클릭한 것이 이미 있을 경우 - 제거
    // 클릭한 것이 없을 경우 - 추가

    if (viewItemList.includes(itemValue)) {
      setViewItemList(viewItemList.filter((item) => item !== itemValue));
    } else {
      setViewItemList([...viewItemList, itemValue]);
    }
  };

  return { viewItemList, onClickItem };
};
