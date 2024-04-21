import { useHexFromDecimal } from 'src/hooks/useHexFromDecimal';
import { useItemFilter } from 'src/hooks/useItemFilter';
import { useOrbitReset } from 'src/hooks/useOrbitReset';
import { useGetNavi } from 'src/hooks/useGetNavi';
import { useGetAllMap, useLoadMap, useGetMap } from 'src/hooks/useMap';

const hooks = {
  useHexFromDecimal: useHexFromDecimal,
  useItemFilter: useItemFilter,
  useLoadMap: useLoadMap,
  useOrbitReset: useOrbitReset,
  useGetNavi: useGetNavi,
  useGetAllMap: useGetAllMap,
  useGetMap: useGetMap,
};

export default hooks;
