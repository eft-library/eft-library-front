import SVG_CONSTANTS from 'src/utils/svg/svgConstants';
import { ITEM_COLOR } from 'src/utils/colorConstants';
import { ALL_ITEM } from 'src/utils/itemConstants';
import PropTypes from 'prop-types';

// 값에 해당하는 SVG를 리턴해주는 함수
const DynamicSVG = ({ svgValue, isEnable }) => {
  const itemheight = 20;
  const itemWidth = 20;

  switch (svgValue) {
    case ALL_ITEM.PMC_EXTRACTION_VALUE:
      return (
        <SVG_CONSTANTS.EXTRACTION
          height={itemheight}
          width={itemWidth}
          color={isEnable ? ITEM_COLOR.PMC_EXTRACTION : ITEM_COLOR.DISABLE}
        />
      );
    case ALL_ITEM.SCAV_EXTRACTION_VALUE:
      return (
        <SVG_CONSTANTS.EXTRACTION
          height={itemheight}
          width={itemWidth}
          color={isEnable ? ITEM_COLOR.SCAV_EXTRACTION : ITEM_COLOR.DISABLE}
        />
      );
    case ALL_ITEM.SHARED_EXTRACTION_VALUE:
      return (
        <SVG_CONSTANTS.EXTRACTION
          height={itemheight}
          width={itemWidth}
          color={isEnable ? ITEM_COLOR.SHARED_EXTRACTION : ITEM_COLOR.DISABLE}
        />
      );
  }
};

DynamicSVG.propTypes = {
  svgValue: PropTypes.string.isRequired,
  isEnable: PropTypes.bool.isRequired,
};

export default DynamicSVG;
