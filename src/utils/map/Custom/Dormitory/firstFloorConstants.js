import ALL_COLOR from 'src/utils/designConstants';
import { ALL_ITEM } from 'src/utils/itemConstants';

const CUSTOM_DORMITORY_FIRST_FLOOR_INFO = {
  // CANVAS 카메라 위치
  CAMERA_POSITION: { position: [0, 10, 10] },

  // 커스텀 1층 기숙사 지도 경로
  PATH: 'models/custom/dormitory/first_floor/custom_dormitory_first_floor.dae',

  // 커스텀 1층 기숙사 아이템 경로
  ITEM_PATH: [
    {
      position: [17.171613125156625, 0, 10.340594377946204],
      boxArgs: [1, 1, 1],
      color: ALL_COLOR.BLACK,
      motherValue: ALL_ITEM.EXTRACTIONS,
      childValue: ALL_ITEM.PMC_EXTRACTION_VALUE,
    },
    {
      position: [6.063382195161616, 0, 11.320286508856583],
      boxArgs: [1, 1, 1],
      color: ALL_COLOR.SKY_BLUE,
      motherValue: ALL_ITEM.EXTRACTIONS,
      childValue: ALL_ITEM.SCAV_EXTRACTION_VALUE,
    },
  ],
};

export default CUSTOM_DORMITORY_FIRST_FLOOR_INFO;
