import { Box } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { UncontrolledReactSVGPanZoom, TOOL_PAN } from 'react-svg-pan-zoom';
import { useWindowSize } from '@react-hook/window-size';
import { MAP_COLOR } from 'src/utils/colorConstants';
import { DynamicJpgSVG } from 'src/utils/svg/DynamicSVG';
import { ALL_ITEM } from 'src/utils/itemConstants';

const JpgView = ({ map, viewItemList }) => {
  const [width, height] = useWindowSize({
    initialWidth: 0,
    initialHeight: 0,
  });
  const Viewer = useRef(null);

  useEffect(() => {
    Viewer.current.fitToViewer();
  }, []);

  if (!map) return null;

  return (
    <Box
      boxSize="sm"
      height={'100%'}
      width={'100%'}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <UncontrolledReactSVGPanZoom
        background={MAP_COLOR.MAP_THREE_BACKGROUND}
        onClick={(e) => console.log(e.x, e.y)}
        ref={Viewer}
        width={width * 0.57}
        height={height * 0.5}
        defaultTool={TOOL_PAN}
        SVGBackground={MAP_COLOR.MAP_THREE_BACKGROUND}
      >
        <svg width={617} height={316} fill={MAP_COLOR.MAP_THREE_BACKGROUND}>
          <image xlinkHref={process.env.REACT_APP_NAS_URL + map.map_jpg_path} />
          {map.map_jpg_item_path.map(
            (item, index) =>
              viewItemList.includes(ALL_ITEM[item.childValue]) && (
                <DynamicJpgSVG
                  key={index}
                  svgValue={item.childValue}
                  x={item.x}
                  y={item.y}
                />
              ),
          )}
        </svg>
      </UncontrolledReactSVGPanZoom>
    </Box>
  );
};

JpgView.propTypes = {
  map: PropTypes.object.isRequired,
  viewItemList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default JpgView;
