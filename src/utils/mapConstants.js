import jpg from 'src/assets/background.png';

export const MAP_LIST = [
  {
    krName: '세관(Custom)',
    enName: 'Custom',
    value: 'CUSTOM',
    path: '/api/map/three_map/custom',
    jpg: jpg,
    subMap: [
      {
        krName: '커스텀 가동 1층 기숙사',
        enName: 'Custom ga first floor dormitory',
        value: 'CUSTOM_GA_FIRST_FLOOR_DORMITORY',
        path: '/api/map/three_map/custom_ga_first_floor_dormitory',
        jpg: jpg,
      },
      {
        krName: '커스텀 가동 2층 기숙사',
        enName: 'Custom ga second floor dormitory',
        value: 'CUSTOM_GA_SECOND_FLOOR_DORMITORY',
        path: '/api/map/three_map/custom_ga_second_floor_dormitory',
        jpg: jpg,
      },
      {
        krName: '커스텀 가동 3층 기숙사',
        enName: 'Custom ga third floor dormitory',
        value: 'CUSTOM_GA_THIRD_FLOOR_DORMITORY',
        path: '/api/map/three_map/custom_ga_third_floor_dormitory',
        jpg: jpg,
      },
      {
        krName: '커스텀 나동 1층 기숙사',
        enName: 'Custom na first floor dormitory',
        value: 'CUSTOM_NA_FIRST_FLOOR_DORMITORY',
        path: '/api/map/three_map/custom_na_first_floor_dormitory',
        jpg: jpg,
      },
      {
        krName: '커스텀 나동 2층 기숙사',
        enName: 'Custom na second floor dormitory',
        value: 'CUSTOM_NA_SECOND_FLOOR_DORMITORY',
        path: '/api/map/three_map/custom_na_second_floor_dormitory',
        jpg: jpg,
      },
    ],
  },
  {
    krName: '등대(Light House)',
    enName: 'LightHouse',
    value: 'LIGHT_HOUSE',
    path: '/api/map/three_map/custom',
    jpg: jpg,
    subMap: [],
  },
  {
    krName: '산림(Woods)',
    enName: 'Woods',
    value: 'WOODS',
    path: '/api/map/three_map/custom',
    jpg: jpg,
    subMap: [],
  },
  {
    krName: '해안선(Shoreline)',
    enName: 'Shoreline',
    value: 'SHORELINE',
    path: '/api/map/three_map/custom',
    jpg: jpg,
    subMap: [],
  },
  {
    krName: '팩토리(Factory)',
    enName: 'Factory',
    value: 'FACTORY',
    path: '/api/map/three_map/custom',
    jpg: jpg,
    subMap: [],
  },
  {
    krName: '리저브(Reserve)',
    enName: 'Reserve',
    value: 'RESERVE',
    path: '/api/map/three_map/custom',
    jpg: jpg,
    subMap: [],
  },
  {
    krName: '연구소(The Lab)',
    enName: 'The Lab',
    value: 'THE_LAB',
    path: '/api/map/three_map/custom',
    jpg: jpg,
    subMap: [],
  },
  {
    krName: '인터체인지(Interchange)',
    enName: 'Interchange',
    value: 'INTERCHANGE',
    path: '/api/map/three_map/custom',
    jpg: jpg,
    subMap: [],
  },
  {
    krName: '그라운드 제로(Ground Zero)',
    enName: 'Ground Zero',
    value: 'GROUND_ZERO',
    path: '/api/map/three_map/custom',
    jpg: jpg,
    subMap: [],
  },
  {
    krName: '타르코프 시내(Street of Tarkov)',
    enName: 'Street of Tarkov',
    value: 'STREET_OF_TARKOV',
    path: '/api/map/three_map/custom',
    jpg: jpg,
    subMap: [],
  },
];

export const findMap = (mapValue, isSubMap = false) => {
  return MAP_LIST.find((obj) => {
    if (isSubMap) {
      return obj.subMap.some((sub) => sub.value === mapValue);
    } else {
      return mapValue === obj.value;
    }
  });
};
