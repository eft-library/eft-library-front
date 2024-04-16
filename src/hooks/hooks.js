import { useHexFromDecimal } from 'src/hooks/useHexFromDecimal';
import { useItemFilter } from 'src/hooks/useItemFilter';
import { useLoadMap } from 'src/hooks/useLoadMap';
import { useOrbitReset } from 'src/hooks/useOrbitReset';
import { useFindMap } from './useFindMap';

const hooks = {
  useHexFromDecimal: useHexFromDecimal,
  useItemFilter: useItemFilter,
  useLoadMap: useLoadMap,
  useOrbitReset: useOrbitReset,
  useFindMap: useFindMap,
};

export default hooks;
