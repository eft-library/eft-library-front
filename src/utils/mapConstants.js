import jpg from 'src/assets/background.png';

export const MAP_INFO = {
  CUSTOM: {
    PATH: '/api/map/three_map/custom',
    NAME: 'CUSTOM',
    JPG: jpg,
  },
  CUSTOM_GA_FIRST_FLOOR_DORMITORY: {
    PATH: '/api/map/three_map/custom_ga_first_floor_dormitory',
    NAME: 'CUSTOM_GA_FIRST_FLOOR_DORMITORY',
    JPG: jpg,
  },
  CUSTOM_GA_SECOND_FLOOR_DORMITORY: {
    PATH: '/api/map/three_map/custom_ga_second_floor_dormitory',
    NAME: 'CUSTOM_GA_SECOND_FLOOR_DORMITORY',
    JPG: jpg,
  },
  CUSTOM_GA_THIRD_FLOOR_DORMITORY: {
    PATH: '/api/map/three_map/custom_ga_third_floor_dormitory',
    NAME: 'CUSTOM_GA_THIRD_FLOOR_DORMITORY',
    JPG: jpg,
  },
  CUSTOM_NA_FIRST_FLOOR_DORMITORY: {
    PATH: '/api/map/three_map/custom_na_first_floor_dormitory',
    NAME: 'CUSTOM_NA_FIRST_FLOOR_DORMITORY',
    JPG: jpg,
  },
  CUSTOM_NA_SECOND_FLOOR_DORMITORY: {
    PATH: '/api/map/three_map/custom_na_second_floor_dormitory',
    NAME: 'CUSTOM_NA_SECOND_FLOOR_DORMITORY',
    JPG: jpg,
  },
  LIGHT_HOUSE: {
    PATH: '/api/map/three_map/custom',
    NAME: 'LIGHT_HOUSE',
    JPG: jpg,
  },
  WOODS: {
    PATH: '/api/map/three_map/custom',
    NAME: 'WOODS',
    JPG: jpg,
  },
  SHORELINE: {
    PATH: '/api/map/three_map/custom',
    NAME: 'SHORELINE',
    JPG: jpg,
  },
  FACTORY: {
    PATH: '/api/map/three_map/custom',
    NAME: 'FACTORY',
    JPG: jpg,
  },
  RESERVE: {
    PATH: '/api/map/three_map/custom',
    NAME: 'RESERVE',
    JPG: jpg,
  },
  THE_LAB: {
    PATH: '/api/map/three_map/custom',
    NAME: 'THE_LAB',
    JPG: jpg,
  },
  INTERCHANGE: {
    PATH: '/api/map/three_map/custom',
    NAME: 'INTERCHANGE',
    JPG: jpg,
  },
  GROUND_ZERO: {
    PATH: '/api/map/three_map/custom',
    NAME: 'GROUND_ZERO',
    JPG: jpg,
  },
  STREET_OF_TARKOV: {
    PATH: '/api/map/three_map/custom',
    NAME: 'STREET_OF_TARKOV',
    JPG: jpg,
  },
};

export const MAP_LIST = [
  {
    kr_name: '세관(Custom)',
    en_name: 'Custom',
    value: 'CUSTOM',
    sub_map: [
      {
        kr_name: '커스텀 가동 1층 기숙사',
        en_name: 'Custom ga first floor dormitory',
        value: 'CUSTOM_GA_FIRST_FLOOR_DORMITORY',
      },
      {
        kr_name: '커스텀 가동 2층 기숙사',
        en_name: 'Custom ga second floor dormitory',
        value: 'CUSTOM_GA_SECOND_FLOOR_DORMITORY',
      },
      {
        kr_name: '커스텀 가동 3층 기숙사',
        en_name: 'Custom ga third floor dormitory',
        value: 'CUSTOM_GA_THIRD_FLOOR_DORMITORY',
      },
      {
        kr_name: '커스텀 나동 1층 기숙사',
        en_name: 'Custom na first floor dormitory',
        value: 'CUSTOM_NA_FIRST_FLOOR_DORMITORY',
      },
      {
        kr_name: '커스텀 나동 2층 기숙사',
        en_name: 'Custom na second floor dormitory',
        value: 'CUSTOM_NA_SECOND_FLOOR_DORMITORY',
      },
    ],
  },
  {
    kr_name: '등대(Light House)',
    en_name: 'LightHouse',
    value: 'LIGHT_HOUSE',
    sub_map: [],
  },
  {
    kr_name: '산림(Woods)',
    en_name: 'Woods',
    value: 'WOODS',
    sub_map: [],
  },
  {
    kr_name: '해안선(Shoreline)',
    en_name: 'Shoreline',
    value: 'SHORELINE',
    sub_map: [],
  },
  {
    kr_name: '팩토리(Factory)',
    en_name: 'Factory',
    value: 'FACTORY',
    sub_map: [],
  },
  {
    kr_name: '리저브(Reserve)',
    en_name: 'Reserve',
    value: 'RESERVE',
    sub_map: [],
  },
  {
    kr_name: '연구소(The Lab)',
    en_name: 'The Lab',
    value: 'THE_LAB',
    sub_map: [],
  },
  {
    kr_name: '인터체인지(Interchange)',
    en_name: 'Interchange',
    value: 'INTERCHANGE',
    sub_map: [],
  },
  {
    kr_name: '그라운드 제로(Ground Zero)',
    en_name: 'Ground Zero',
    value: 'GROUND_ZERO',
    sub_map: [],
  },
  {
    kr_name: '타르포크 시내(Street of Tarkov)',
    en_name: 'Street of Tarkov',
    value: 'STREET_OF_TARKOV',
    sub_map: [],
  },
];
