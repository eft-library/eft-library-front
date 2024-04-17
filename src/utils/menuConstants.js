export const MENU_LIST = [
  {
    value: 'MAP',
    krName: '지도',
    enName: 'Map',
    subMenu: [
      {
        krName: '세관',
        enName: 'Custom',
        value: 'CUSTOM',
        link: '/map/CUSTOM',
      },
      {
        krName: '등대',
        enName: 'LightHouse',
        value: 'LIGHT_HOUSE',
        link: '/map/LIGHT_HOUSE',
      },
      {
        krName: '산림',
        enName: 'Woods',
        value: 'WOODS',
        link: '/map/WOODS',
      },
      {
        krName: '해안선',
        enName: 'Shoreline',
        value: 'SHORELINE',
        link: '/map/SHORELINE',
      },
      {
        krName: '팩토리',
        enName: 'Factory',
        value: 'FACTORY',
        link: '/map/FACTORY',
      },
      {
        krName: '리저브',
        enName: 'Reserve',
        value: 'RESERVE',
        link: '/map/RESERVE',
      },
      {
        krName: '연구소',
        enName: 'The Lab',
        value: 'THE_LAB',
        link: '/map/THE_LAB',
      },
      {
        krName: '인터체인지',
        enName: 'Interchange',
        value: 'INTERCHANGE',
        link: '/map/INTERCHANGE',
      },
      {
        krName: '그라운드 제로',
        enName: 'Ground Zero',
        value: 'GROUND_ZERO',
        link: '/map/GROUND_ZERO',
      },
      {
        krName: '타르코프 시내',
        enName: 'Street of Tarkov',
        value: 'STREET_OF_TARKOV',
        link: '/map/STREET_OF_TARKOV',
      },
    ],
  },
  {
    value: 'QUEST',
    krName: '퀘스트',
    enName: 'Quest',
    link: '/quest',
    subMenu: [
      {
        krName: '프라퍼',
        enName: 'Prapor',
        value: 'PRAPOR',
        link: '/quest/PRAPOR',
      },
      {
        krName: '테라피스트',
        enName: 'Therapist',
        value: 'THERAPIST',
        link: '/quest/THERAPIST',
      },
      {
        krName: '펜스',
        enName: 'Fence',
        value: 'FENCE',
        link: '/quest/FENCE',
      },
      {
        krName: '스키어',
        enName: 'Skier',
        value: 'SKIER',
        link: '/quest/SKIER',
      },
      {
        krName: '피스키퍼',
        enName: 'Peacekeeper',
        value: 'PEACE_KEEPER',
        link: '/quest/PEACE_KEEPER',
      },
      {
        krName: '메카닉',
        enName: 'Mechanic',
        value: 'MECHANIC',
        link: '/quest/MECHANIC',
      },
      {
        krName: '레그맨',
        enName: 'Ragman',
        value: 'RAG_MAN',
        link: '/quest/RAG_MAN',
      },
      {
        krName: '예거',
        enName: 'Jaeger',
        value: 'JAEGER',
        link: '/quest/JAEGER',
      },
      {
        krName: '등대지기',
        enName: 'Lightkeeper',
        value: 'LIGHT_KEEPER',
        link: '/quest/LIGHT_KEEPER',
      },
    ],
  },
  {
    value: 'ITEM',
    krName: '아이템',
    enName: 'Item',
    subMenu: [
      {
        krName: '무기',
        enName: 'Weapon',
        value: 'WEAPON',
        link: '/item/WEAPON',
      },
      {
        krName: '총알',
        enName: 'Ammo',
        value: 'AMMO',
        link: '/item/AMMO',
      },
      {
        krName: '방탄모',
        enName: 'Head Wear',
        value: 'HEAD_WEAR',
        link: '/item/HEAD_WEAR',
      },
      {
        krName: '의료품',
        enName: 'Medical',
        value: 'MEDICAL',
        link: '/item/MEDICAL',
      },
      {
        krName: '컨테이너',
        enName: 'Container',
        value: 'CONTAINER',
        link: '/item/CONTAINER',
      },
      {
        krName: '전술 조끼',
        enName: 'Rig',
        value: 'RIG',
        link: '/item/RIG',
      },
      {
        krName: '방탄 조끼',
        enName: 'Armor Vest',
        value: 'ARMOR_VEST',
        link: '/item/ARMOR_VEST',
      },
      { krName: '키', enName: 'Key', value: 'KEY', link: '/item/KEY' },
      {
        krName: '헤드셋',
        enName: 'Headset',
        value: 'HEADSET',
        link: '/item/HEADSET',
      },
      { krName: '가방', enName: 'Bag', value: 'BAG', link: '/item/BAG' },
    ],
  },
  {
    value: 'INFO',
    krName: '정보',
    enName: 'Info',
    subMenu: [
      {
        krName: '보스',
        enName: 'Boss',
        value: 'BOSS',
        link: '/info/BOSS',
      },
      {
        krName: '하이드아웃',
        enName: 'Hideout',
        value: 'HIDEOUT',
        link: '/info/HIDEOUT',
      },
    ],
  },
];

export const MAIN_LIST = [
  ...MENU_LIST.filter(
    (menu) =>
      menu.value !== 'ITEM' && menu.value !== 'INFO' && menu.value !== 'MAP',
  ),
  ...(MENU_LIST.find((menu) => menu.value === 'ITEM')?.subMenu || []),
  ...(MENU_LIST.find((menu) => menu.value === 'INFO')?.subMenu || []),
];
