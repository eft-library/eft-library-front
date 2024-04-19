import { MAP_LIST } from 'src/utils/mapConstants';

/**
 * value로 map 찾기
 */
export const useFindMap = (mapValue, isSubMap = false) => {
  if (isSubMap) {
    return MAP_LIST.map((map) =>
      map.map_sub.find((sub) => sub.map_id === mapValue),
    ).find((subMapItem) => subMapItem !== undefined);
  } else {
    return MAP_LIST.find((obj) => mapValue === obj.map_id);
  }
};
