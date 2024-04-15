import SVG_CONSTANTS from 'src/utils/svg/svgConstants';
import { ITEM_COLOR } from 'src/utils/colorConstants';
import { ALL_ITEM } from 'src/utils/itemConstants';

// 값에 해당하는 SVG를 리턴해주는 함수
const DynamicSVG = ({ svgValue }) => {
  const itemheight = 20;
  const itemWidth = 20;

  switch (svgValue) {
    case ALL_ITEM.PMC_EXTRACTION_VALUE:
      return (
        <SVG_CONSTANTS.EXTRACTION
          height={itemheight}
          width={itemWidth}
          color={ITEM_COLOR.PMC_EXTRACTION}
        />
      );
    case ALL_ITEM.SCAV_EXTRACTION_VALUE:
      return (
        <SVG_CONSTANTS.EXTRACTION
          height={itemheight}
          width={itemWidth}
          color={ITEM_COLOR.SCAV_EXTRACTION}
        />
      );
    case ALL_ITEM.SHARED_EXTRACTION_VALUE:
      return (
        <SVG_CONSTANTS.EXTRACTION
          height={itemheight}
          width={itemWidth}
          color={ITEM_COLOR.SHARED_EXTRACTION}
        />
      );
  }
};

export default DynamicSVG;
