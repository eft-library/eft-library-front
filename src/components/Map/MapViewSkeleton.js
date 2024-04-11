import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const MapViewSkeleton = () => {
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex' }}>
      <div
        style={{
          width: '20%',
          display: 'block',
          alignItems: 'center',
          alignContent: 'center',
        }}
      >
        <Skeleton count={10} />
      </div>
      <div style={{ width: '80%' }}>
        <Skeleton height={'100%'} />
      </div>
    </div>
  );
};

export default MapViewSkeleton;
