import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { MAP_COLOR } from 'src/utils/colorConstants';

const MapViewSkeleton = () => {
  return (
    <div className="CenterBox" style={{ width: '100%' }}>
      <div style={{ backgroundColor: MAP_COLOR.MAP_BLACK, height: '100vh' }}>
        <Skeleton height={'100%'} />
      </div>
    </div>
  );
};

export default MapViewSkeleton;
