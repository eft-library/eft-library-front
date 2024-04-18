import SVG_CONSTANTS from 'src/utils/svg/svgConstants';
import { ITEM_COLOR } from 'src/utils/colorConstants';
import { ALL_ITEM } from 'src/utils/itemConstants';
import PropTypes from 'prop-types';

// 값에 해당하는 SVG를 리턴해주는 함수
const DynamicSVG = ({ svgValue, isEnable }) => {
  const itemheight = 25;
  const itemWidth = 25;

  switch (svgValue) {
    case ALL_ITEM.PMC_EXTRACTION_VALUE:
      return (
        <SVG_CONSTANTS.EXTRACTION
          height={itemheight}
          width={itemWidth}
          color={ITEM_COLOR.PMC_EXTRACTION}
          opacity={isEnable ? '1' : '0.5'}
        />
      );
    case ALL_ITEM.SCAV_EXTRACTION_VALUE:
      return (
        <SVG_CONSTANTS.EXTRACTION
          height={itemheight}
          width={itemWidth}
          color={ITEM_COLOR.SCAV_EXTRACTION}
          opacity={isEnable ? '1' : '0.5'}
        />
      );
    case ALL_ITEM.SHARED_EXTRACTION_VALUE:
      return (
        <SVG_CONSTANTS.EXTRACTION
          height={itemheight}
          width={itemWidth}
          color={ITEM_COLOR.SHARED_EXTRACTION}
          opacity={isEnable ? '1' : '0.5'}
        />
      );
  }
};

DynamicSVG.propTypes = {
  svgValue: PropTypes.string.isRequired,
  isEnable: PropTypes.bool.isRequired,
};

export default DynamicSVG;
