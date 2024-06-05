import SVG_CONSTANTS from 'src/utils/consts/svgConsts';
import PropTypes from 'prop-types';
import { ALL_COLOR } from 'src/utils/consts/colorConsts';

const DynamicJpgSVG = ({ x, y, svgValue }) => {
  return (
    <SVG_CONSTANTS.JPG_EXTRACTION x={x} y={y} color={ALL_COLOR[svgValue]} />
  );
};

DynamicJpgSVG.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  svgValue: PropTypes.string.isRequired,
};

export default DynamicJpgSVG;
