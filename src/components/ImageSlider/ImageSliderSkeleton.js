import { Skeleton, Box, Image, Slider } from '@chakra-ui/react';
import { ALL_COLOR } from 'src/utils/consts/colorConsts';

const ImageSliderSkeleton = () => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '40px',
        marginTop: '40px',
      }}
    >
      <div
        style={{
          width: '85%',
          height: '30%',
        }}
      >
        <Slider>
          {Array.from({ length: 1 }).map((_, index) => (
            <Box
              key={index}
              boxSize="sm"
              border={'1px'}
              borderColor={ALL_COLOR.WHITE}
              width="100%"
              height={'280px'}
            >
              <Skeleton startColor="gray.300" endColor="gray.500" height="100%">
                <Image boxSize="100%" />
              </Skeleton>
            </Box>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ImageSliderSkeleton;
