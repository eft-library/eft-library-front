import { Box, Image } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const JpgView = ({ map }) => {
  return (
    <Box boxSize="sm" width={'100%'}>
      <Image
        src={process.env.REACT_APP_NAS_URL + map.map_jpg_path}
        boxSize="100%"
      />
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
