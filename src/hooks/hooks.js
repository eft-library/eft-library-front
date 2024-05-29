import { useItemFilter } from 'src/hooks/useItemFilter';
import { useNavi, useGetInfo } from 'src/hooks/useNavi';
import {
  useGetAllMap,
  useLoadMap,
  useGetMap,
  useOrbitReset,
} from 'src/hooks/useMap';
import { useGetNpc, useGetAllQuest, useGetQuest } from 'src/hooks/useQuest';
import { useGetAllWeapon } from 'src/hooks/useWeapon';
import { useGetAllBoss } from './useBoss';
import { useMapOfTarkov } from './useMapOfTarkov';
import { useGetColumn } from './useColumn';
import { useGetYoutube, useGetSearch } from './useMain';

const hooks = {
  useItemFilter: useItemFilter,
  useLoadMap: useLoadMap,
  useOrbitReset: useOrbitReset,
  useNavi: useNavi,
  useGetInfo: useGetInfo,
  useGetAllMap: useGetAllMap,
  useGetMap: useGetMap,
  useGetNpc: useGetNpc,
  useGetAllQuest: useGetAllQuest,
  useGetQuest: useGetQuest,
  useGetAllWeapon: useGetAllWeapon,
  useGetAllBoss: useGetAllBoss,
  useMapOfTarkov: useMapOfTarkov,
  useGetColumn: useGetColumn,
  useGetYoutube: useGetYoutube,
  useGetSearch: useGetSearch,
};

export default hooks;
