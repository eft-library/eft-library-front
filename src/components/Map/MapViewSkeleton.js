import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const MapViewSkeleton = () => {
  return (
    <div className="CenterBox" style={{ width: '70%' }}>
      <div className="2D Image">
        <Skeleton height={20} width={100} style={{ color: 'white' }} />
        <br />
        <Skeleton height={20} width={100} style={{ color: 'tomato' }} />
        <br />
        <Skeleton height={20} width={100} style={{ color: 'white' }} />
        <br />
      </div>
      <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)', height: '100vh' }}>
        <Skeleton height={'100%'} />
      </div>
    </div>
  );
};

export default MapViewSkeleton;
