import { Box } from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { UncontrolledReactSVGPanZoom } from 'react-svg-pan-zoom';
import { useWindowSize } from '@react-hook/window-size';

const JpgView = ({ map }) => {
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
        onClick={(e) => console.log(e.x, e.y)}
        ref={Viewer}
        width={width * 0.57}
        height={height * 0.5}
        defaultTool="pan"
      >
        <svg width={617} height={316}>
          <image xlinkHref={process.env.REACT_APP_NAS_URL + map.map_jpg_path} />
          <svg x={10} y={10} width={100} height={100}>
            {/* 아이콘 내용 */}
            <circle cx={50} cy={50} r={20} fill="red" />
          </svg>
          <svg x={440} y={440} width={100} height={100}>
            {/* 아이콘 내용 */}
            <circle cx={50} cy={50} r={20} fill="white" />
          </svg>
          <svg x={330} y={330} width={100} height={100}>
            {/* 아이콘 내용 */}
            <circle cx={50} cy={50} r={20} fill="skyblue" />
          </svg>
          <svg x={220} y={220} width={100} height={100}>
            {/* 아이콘 내용 */}
            <circle cx={50} cy={50} r={20} fill="teal" />
          </svg>
          <svg x={160} y={160} width={100} height={100}>
            {/* 아이콘 내용 */}
            <circle cx={50} cy={50} r={20} fill="hotpink" />
          </svg>
        </svg>
      </UncontrolledReactSVGPanZoom>
    </Box>
  );
};

// JpgView.propTypes = {
//   map: PropTypes.objectOf(
//     PropTypes.shape({
//       map_name_kr: PropTypes.string.isRequired,
//       map_name_en: PropTypes.string.isRequired,
//       map_id: PropTypes.string.isRequired,
//       map_three_path: PropTypes.string.isRequired,
//       map_update_time: PropTypes.string.isRequired,
//       map_jpg_path: PropTypes.string.isRequired,
//       map_depth: PropTypes.number.isRequired,
//       map_link: PropTypes.string.isRequired,
//       map_three_item_path: PropTypes.arrayOf(
//         PropTypes.shape({
//           color: PropTypes.string.isRequired,
//           boxArgs: PropTypes.arrayOf(PropTypes.number.isRequired),
//           position: PropTypes.arrayOf(PropTypes.number.isRequired),
//           childValue: PropTypes.string.isRequired,
//           motherValue: PropTypes.string.isRequired,
//         }),
//       ),
//       map_main_image: PropTypes.string.isRequired,
//       map_jpg_item_path: PropTypes.arrayOf(
//         PropTypes.shape({
//           item: PropTypes.number,
//         }),
//       ),
//       map_sub: PropTypes.arrayOf(
//         PropTypes.shape({
//           map_name_kr: PropTypes.string.isRequired,
//           map_name_en: PropTypes.string.isRequired,
//           map_id: PropTypes.string.isRequired,
//           map_three_path: PropTypes.string.isRequired,
//           map_update_time: PropTypes.string.isRequired,
//           map_jpg_path: PropTypes.string.isRequired,
//           map_depth: PropTypes.number.isRequired,
//           map_link: PropTypes.string.isRequired,
//           map_three_item_path: PropTypes.arrayOf(
//             PropTypes.shape({
//               color: PropTypes.string.isRequired,
//               boxArgs: PropTypes.arrayOf(PropTypes.number.isRequired),
//               position: PropTypes.arrayOf(PropTypes.number.isRequired),
//               childValue: PropTypes.string.isRequired,
//               motherValue: PropTypes.string.isRequired,
//             }),
//           ),
//           map_main_image: PropTypes.string.isRequired,
//           map_jpg_item_path: PropTypes.arrayOf(
//             PropTypes.shape({
//               item: PropTypes.number,
//             }),
//           ),
//           map_parent_value: PropTypes.string.isRequired,
//         }),
//       ),
//     }),
//   ).isRequired,
// };

export default JpgView;
