import { MAP_LIST } from 'src/utils/mapConstants';
import Slider from 'react-slick';
import { Box, Image } from '@chakra-ui/react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '40px',
        marginTop: '40px',
      }}
    >
      <div
        style={{
          width: '85%',
          height: '20%',
        }}
      >
        <Slider {...settings}>
          {MAP_LIST.map((map, index) => (
            <Box boxSize="sm" key={index} border={'1px'} borderColor={'white'}>
              <Image src={map.jpg} boxSize="100%" />
            </Box>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ImageSlider;
