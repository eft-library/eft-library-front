import { ALL_COLOR } from 'src/utils/consts/colorConsts';
import { Skeleton } from '@chakra-ui/react';

const ThreeViewSkeleton = () => {
  return (
    <div className="CenterBox" style={{ width: '100%' }}>
      <div
        style={{ backgroundColor: ALL_COLOR.THREE_BACKGROUND, height: '100vh' }}
      >
        <Skeleton height={'100%'} />
      </div>
    </div>
  );
};

export default ThreeViewSkeleton;
