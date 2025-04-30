export interface ItemType {
  value: string;
  name: LocaleName;
  sub: SubItemType[];
}

interface LocaleName {
  en: string;
  ja: string;
  ko: string;
}

export interface SubItemType {
  value: string;
  name: LocaleName;
}

/**
 * child 있는지 확인
 */
export const isItem = (obj: ItemType | SubItemType): obj is ItemType => {
  return (obj as ItemType).sub !== undefined;
};

/**
 * child의 value로 root 찾기
 */
export const findObjectWithValue = (
  obj: ItemType | SubItemType,
  value: string
): ItemType | SubItemType | undefined => {
  // 현재 객체의 value가 주어진 값과 일치하면 현재 객체를 반환
  if (obj.value === value) {
    return obj;
  }

  // 현재 객체에 child 속성이 있다면 해당 배열을 순회하면서 탐색
  if (isItem(obj) && obj.sub) {
    for (const childObj of obj.sub) {
      const result = findObjectWithValue(childObj, value);
      // 만약 하위 객체에서 값을 찾았다면 해당 객체 반환
      if (result) {
        return result;
      }
    }
  }

  // 현재 객체와 하위 객체에서 값이 발견되지 않으면 undefined 반환
  return undefined;
};

/**
 * 모든 child가 있는지 확인
 * 있으면 true, 없으면 false
 */
export const checkAllChild = (itemList: string[], childList: string[]) => {
  return childList.every((childValue) => itemList.includes(childValue));
};

/**
 * child가 어느 정도 있는지 요소 판별
 * 모든 child가 있을 때 또는 몇 개의 child만 있을 때: true
 * 모든 child가 없을 때: false
 */
export const checkSomeChild = (itemList: string[], childList: string[]) => {
  return childList.some((childValue) => itemList.includes(childValue));
};

/**
 * valueList 추출
 */
export const extractValues = (data: ItemType[]) => {
  const values: string[] = [];

  if (!data || data.length == 0) return [];

  data.forEach((item) => {
    values.push(item.value);

    if (item.sub && Array.isArray(item.sub)) {
      item.sub.forEach((subItem) => {
        values.push(subItem.value);
      });
    }
  });
  return values;
};
