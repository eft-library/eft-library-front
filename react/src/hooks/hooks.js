import { useItemFilter } from './useItemFilter';
import { useLoadMap, useOrbitReset } from './useMap';
import { useGetApiWithNone, useGetApiWithParam } from './useApi';
import { useColumnListByKr, useColumnListByJson } from './useColumn';
import { useImageLink } from './useImageLink';

const hooks = {
  useItemFilter: useItemFilter,
  useLoadMap: useLoadMap,
  useOrbitReset: useOrbitReset,
  useGetApiWithNone: useGetApiWithNone,
  useGetApiWithParam: useGetApiWithParam,
  useColumnListByKr: useColumnListByKr,
  useColumnListByJson: useColumnListByJson,
  useImageLink: useImageLink,
};

export default hooks;
