import SVG_CONSTANTS from 'src/utils/consts/svgConsts';
import { ALL_ITEM } from 'src/utils/consts/itemConsts';
import PropTypes from 'prop-types';
import { ALL_COLOR } from 'src/utils/consts/colorConsts';

const DynamicJpgSVG = ({ x, y, svgValue }) => {
  switch (svgValue) {
    case ALL_ITEM.PMC_EXTRACTION:
      return (
        <SVG_CONSTANTS.JPG_EXTRACTION
          x={x}
          y={y}
          color={ALL_COLOR.PMC_EXTRACTION}
        />
      );
    case ALL_ITEM.SCAV_EXTRACTION:
      return (
        <SVG_CONSTANTS.JPG_EXTRACTION
          x={x}
          y={y}
          color={ALL_COLOR.SCAV_EXTRACTION}
        />
      );
    case ALL_ITEM.SHARED_EXTRACTION:
      return (
        <SVG_CONSTANTS.JPG_EXTRACTION
          x={x}
          y={y}
          color={ALL_COLOR.SHARED_EXTRACTION}
        />
      );
  }
};

DynamicJpgSVG.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  svgValue: PropTypes.string.isRequired,
};

export default DynamicJpgSVG;
