import { MAP_LIST } from 'src/utils/mapConstants';
import Slider from 'react-slick';
import { Box, Image } from '@chakra-ui/react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
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
        <Slider {...settings}>
          {MAP_LIST.map((map, index) => (
            <Box
              boxSize="sm"
              key={index}
              border={'1px'}
              borderColor={'white'}
              height={'100%'}
            >
              <Image src={map.map_main_image} boxSize="100%" />
            </Box>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ImageSlider;
