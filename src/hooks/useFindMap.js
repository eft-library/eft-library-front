import { MAP_LIST } from 'src/utils/mapConstants';

/**
 * value로 map 찾기
 */
export const useFindMap = (mapValue, isSubMap = false) => {
  if (isSubMap) {
    return MAP_LIST.map((map) =>
      map.subMap.find((sub) => sub.value === mapValue),
    ).find((subMapItem) => subMapItem !== undefined);
  } else {
    return MAP_LIST.find((obj) => mapValue === obj.value);
  }
};
