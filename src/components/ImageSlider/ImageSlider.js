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
                    height="768"
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
      <Gallery>
        {/* <Box boxSize="sm" border={'1px'} borderColor={'white'} height={'100%'}>
          <Item
            original={process.env.REACT_APP_NAS_URL + mapList[0].map_main_image}
            thumbnail={
              process.env.REACT_APP_NAS_URL + mapList[0].map_main_image
            }
            width="1024"
            height="768"
          >
            {({ ref, open }) => (
              <img
                ref={ref}
                onClick={open}
                src={process.env.REACT_APP_NAS_URL + mapList[0].map_main_image}
              />
            )}
          </Item>
        </Box> */}
      </Gallery>
    </div>
  );
};

ImageSlider.propTypes = {
  mapList: PropTypes.array,
  imagePath: PropTypes.string,
  sliderOption: PropTypes.object,
};

export default ImageSlider;
