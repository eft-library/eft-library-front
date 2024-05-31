import Slider from 'react-slick';
import { Box, Image } from '@chakra-ui/react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'photoswipe/dist/photoswipe.css';
import { Gallery, Item } from 'react-photoswipe-gallery';
import PropTypes from 'prop-types';

const ImageSlider = ({ mapList, imagePath, sliderOption, useZoom }) => {
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
          width: '95%',
          height: '30%',
        }}
      >
        <Slider {...sliderOption}>
          {mapList.map((map, index) => (
            <Box boxSize="sm" key={index} height={'100%'}>
              {useZoom ? (
                <Gallery>
                  <Item
                    original={process.env.REACT_APP_NAS_URL + map[imagePath]}
                    thumbnail={process.env.REACT_APP_NAS_URL + map[imagePath]}
                    width="1440"
                    height="810.06"
                  >
                    {({ ref, open }) => (
                      <Image
                        ref={ref}
                        onClick={open}
                        src={process.env.REACT_APP_NAS_URL + map[imagePath]}
                        boxSize="100%"
                        cursor="pointer"
                      />
                    )}
                  </Item>
                </Gallery>
              ) : (
                <Image
                  src={process.env.REACT_APP_NAS_URL + map[imagePath]}
                  boxSize="100%"
                />
              )}
            </Box>
          ))}
        </Slider>
      </div>
    </div>
  );
};

ImageSlider.propTypes = {
  mapList: PropTypes.array,
  imagePath: PropTypes.string,
  sliderOption: PropTypes.object,
  useZoom: PropTypes.bool,
};

export default ImageSlider;
