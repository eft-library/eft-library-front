import Slider from 'react-slick';
import { Box, Image } from '@chakra-ui/react';
import { IMAGE_SLIDER_OPTION } from 'src/utils/consts/libraryConsts';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import hooks from 'src/hooks/hooks';
import ImageSliderSkeleton from 'src/components/Main/ImageSlider/ImageSliderSkeleton';
import 'photoswipe/dist/photoswipe.css';
import { Gallery, Item } from 'react-photoswipe-gallery';

const ImageSlider = () => {
  const { map, loading } = hooks.useGetAllMap();

  if (!map && loading) return <ImageSliderSkeleton />;

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
        <Slider {...IMAGE_SLIDER_OPTION}>
          {map.map((map, index) => (
            <Box
              boxSize="sm"
              key={index}
              border={'1px'}
              borderColor={'white'}
              height={'100%'}
            >
              <Image
                src={process.env.REACT_APP_NAS_URL + map.map_main_image}
                boxSize="100%"
              />
            </Box>
          ))}
        </Slider>
      </div>
      <Gallery>
        <Box boxSize="sm" border={'1px'} borderColor={'white'} height={'100%'}>
          <Item
            original={process.env.REACT_APP_NAS_URL + map[0].map_main_image}
            thumbnail={process.env.REACT_APP_NAS_URL + map[0].map_main_image}
            width="1024"
            height="768"
          >
            {({ ref, open }) => (
              <img
                ref={ref}
                onClick={open}
                src={process.env.REACT_APP_NAS_URL + map[0].map_main_image}
              />
            )}
          </Item>
        </Box>
      </Gallery>
    </div>
  );
};

export default ImageSlider;
