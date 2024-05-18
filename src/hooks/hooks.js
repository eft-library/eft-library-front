import { useItemFilter } from 'src/hooks/useItemFilter';
import { useOrbitReset } from 'src/hooks/useOrbitReset';
import { useGetNavi } from 'src/hooks/useGetNavi';
import { useGetAllMap, useLoadMap, useGetMap } from 'src/hooks/useMap';
import { useGetNpc, useGetAllQuest, useGetQuest } from 'src/hooks/useQuest';
import { useGetAllWeapon } from 'src/hooks/useWeapon';

const hooks = {
  useItemFilter: useItemFilter,
  useLoadMap: useLoadMap,
  useOrbitReset: useOrbitReset,
  useGetNavi: useGetNavi,
  useGetAllMap: useGetAllMap,
  useGetMap: useGetMap,
  useGetNpc: useGetNpc,
  useGetAllQuest: useGetAllQuest,
  useGetQuest: useGetQuest,
  useGetAllWeapon: useGetAllWeapon,
};

export default hooks;
