import { useItemFilter } from 'src/hooks/useItemFilter';
import { useOrbitReset } from 'src/hooks/useOrbitReset';
import { useGetNavi, useGetInfo } from 'src/hooks/useGetNavi';
import { useGetAllMap, useLoadMap, useGetMap } from 'src/hooks/useMap';
import { useGetNpc, useGetAllQuest, useGetQuest } from 'src/hooks/useQuest';
import { useGetAllWeapon } from 'src/hooks/useWeapon';
import { useGetAllBoss } from './useBoss';

const hooks = {
  useItemFilter: useItemFilter,
  useLoadMap: useLoadMap,
  useOrbitReset: useOrbitReset,
  useGetNavi: useGetNavi,
  useGetInfo: useGetInfo,
  useGetAllMap: useGetAllMap,
  useGetMap: useGetMap,
  useGetNpc: useGetNpc,
  useGetAllQuest: useGetAllQuest,
  useGetQuest: useGetQuest,
  useGetAllWeapon: useGetAllWeapon,
  useGetAllBoss: useGetAllBoss,
};

export default hooks;
