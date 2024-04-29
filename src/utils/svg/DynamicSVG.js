import SVG_CONSTANTS from 'src/utils/svg/svgConstants';
import { ITEM_COLOR } from 'src/utils/colorConstants';
import { ALL_ITEM } from 'src/utils/itemConstants';
import PropTypes from 'prop-types';

// 값에 해당하는 SVG를 리턴해주는 함수
export const DynamicSVG = ({ x, y, svgValue, isEnable }) => {
  const itemHeight = 25;
  const itemWidth = 25;
  const footerHeigth = 40;
  const footerWidth = 40;

  switch (svgValue) {
    case ALL_ITEM.PMC_EXTRACTION:
      return (
        <SVG_CONSTANTS.EXTRACTION
          x={x}
          y={y}
          height={itemHeight}
          width={itemWidth}
          color={ITEM_COLOR.PMC_EXTRACTION}
          opacity={isEnable ? '1' : '0.5'}
        />
      );
    case ALL_ITEM.SCAV_EXTRACTION:
      return (
        <SVG_CONSTANTS.EXTRACTION
          x={x}
          y={y}
          height={itemHeight}
          width={itemWidth}
          color={ITEM_COLOR.SCAV_EXTRACTION}
          opacity={isEnable ? '1' : '0.5'}
        />
      );
    case ALL_ITEM.SHARED_EXTRACTION:
      return (
        <SVG_CONSTANTS.EXTRACTION
          x={x}
          y={y}
          height={itemHeight}
          width={itemWidth}
          color={ITEM_COLOR.SHARED_EXTRACTION}
          opacity={isEnable ? '1' : '0.5'}
        />
      );
    case 'HJ':
      return <SVG_CONSTANTS.CHZZK height={footerHeigth} width={footerWidth} />;
    case 'SY':
      return <SVG_CONSTANTS.GITHUB height={footerHeigth} width={footerWidth} />;
    case 'JY':
      return (
        <SVG_CONSTANTS.YOUTUBE height={footerHeigth} width={footerWidth} />
      );
  }
};

DynamicSVG.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  svgValue: PropTypes.string.isRequired,
  isEnable: PropTypes.bool.isRequired,
};

export const DynamicJpgSVG = ({ x, y, svgValue }) => {
  switch (svgValue) {
    case ALL_ITEM.PMC_EXTRACTION:
      return (
        <SVG_CONSTANTS.JPG_EXTRACTION
          x={x}
          y={y}
          color={ITEM_COLOR.PMC_EXTRACTION}
        />
      );
    case ALL_ITEM.SCAV_EXTRACTION:
      return (
        <SVG_CONSTANTS.JPG_EXTRACTION
          x={x}
          y={y}
          color={ITEM_COLOR.SCAV_EXTRACTION}
        />
      );
    case ALL_ITEM.SHARED_EXTRACTION:
      return (
        <SVG_CONSTANTS.JPG_EXTRACTION
          x={x}
          y={y}
          color={ITEM_COLOR.SHARED_EXTRACTION}
        />
      );
  }
};

DynamicJpgSVG.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  svgValue: PropTypes.string.isRequired,
};
