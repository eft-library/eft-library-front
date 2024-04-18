import ammo from 'src/assets/ammo.jpg';
import armor_vest from 'src/assets/armor_vest.jpg';
import bag from 'src/assets/bag.jpg';
import boss from 'src/assets/boss.png';
import container from 'src/assets/container.jpg';
import head_wear from 'src/assets/head_wear.jpg';
import headset from 'src/assets/headset.jpg';
import hideout from 'src/assets/hideout.jpg';
import key from 'src/assets/key.jpg';
import medical from 'src/assets/medical.jpg';
import quest from 'src/assets/quest.jpg';
import rig from 'src/assets/rig.jpg';
import weapon from 'src/assets/weapon.jpg';

export const MENU_LIST = [
  {
    value: 'MAP',
    krName: '지도',
    enName: 'Map',
    image: quest,
    subMenu: [
      {
        krName: '세관',
        enName: 'Custom',
        value: 'CUSTOM',
        link: '/map/CUSTOM',
        image: quest,
      },
      {
        krName: '등대',
        enName: 'LightHouse',
        value: 'LIGHT_HOUSE',
        link: '/map/LIGHT_HOUSE',
        image: quest,
      },
      {
        krName: '산림',
        enName: 'Woods',
        value: 'WOODS',
        link: '/map/WOODS',
        image: quest,
      },
      {
        krName: '해안선',
        enName: 'Shoreline',
        value: 'SHORELINE',
        link: '/map/SHORELINE',
        image: quest,
      },
      {
        krName: '팩토리',
        enName: 'Factory',
        value: 'FACTORY',
        link: '/map/FACTORY',
        image: quest,
      },
      {
        krName: '리저브',
        enName: 'Reserve',
        value: 'RESERVE',
        link: '/map/RESERVE',
        image: quest,
      },
      {
        krName: '연구소',
        enName: 'The Lab',
        value: 'THE_LAB',
        link: '/map/THE_LAB',
        image: quest,
      },
      {
        krName: '인터체인지',
        enName: 'Interchange',
        value: 'INTERCHANGE',
        link: '/map/INTERCHANGE',
        image: quest,
      },
      {
        krName: '그라운드 제로',
        enName: 'Ground Zero',
        value: 'GROUND_ZERO',
        link: '/map/GROUND_ZERO',
        image: quest,
      },
      {
        krName: '타르코프 시내',
        enName: 'Street of Tarkov',
        value: 'STREET_OF_TARKOV',
        link: '/map/STREET_OF_TARKOV',
        image: quest,
      },
    ],
  },
  {
    value: 'QUEST',
    krName: '퀘스트',
    enName: 'Quest',
    link: '/quest',
    image: quest,
    subMenu: [
      {
        krName: '프라퍼',
        enName: 'Prapor',
        value: 'PRAPOR',
        link: '/quest/PRAPOR',
        image: quest,
      },
      {
        krName: '테라피스트',
        enName: 'Therapist',
        value: 'THERAPIST',
        link: '/quest/THERAPIST',
        image: quest,
      },
      {
        krName: '펜스',
        enName: 'Fence',
        value: 'FENCE',
        link: '/quest/FENCE',
        image: quest,
      },
      {
        krName: '스키어',
        enName: 'Skier',
        value: 'SKIER',
        link: '/quest/SKIER',
        image: quest,
      },
      {
        krName: '피스키퍼',
        enName: 'Peacekeeper',
        value: 'PEACE_KEEPER',
        link: '/quest/PEACE_KEEPER',
        image: quest,
      },
      {
        krName: '메카닉',
        enName: 'Mechanic',
        value: 'MECHANIC',
        link: '/quest/MECHANIC',
        image: quest,
      },
      {
        krName: '레그맨',
        enName: 'Ragman',
        value: 'RAG_MAN',
        link: '/quest/RAG_MAN',
        image: quest,
      },
      {
        krName: '예거',
        enName: 'Jaeger',
        value: 'JAEGER',
        link: '/quest/JAEGER',
        image: quest,
      },
      {
        krName: '등대지기',
        enName: 'Lightkeeper',
        value: 'LIGHT_KEEPER',
        link: '/quest/LIGHT_KEEPER',
        image: quest,
      },
    ],
  },
  {
    value: 'ITEM',
    krName: '아이템',
    enName: 'Item',
    image: quest,
    subMenu: [
      {
        krName: '무기',
        enName: 'Weapon',
        value: 'WEAPON',
        link: '/item/WEAPON',
        image: weapon,
      },
      {
        krName: '총알',
        enName: 'Ammo',
        value: 'AMMO',
        link: '/item/AMMO',
        image: ammo,
      },
      {
        krName: '방탄모',
        enName: 'Head Wear',
        value: 'HEAD_WEAR',
        link: '/item/HEAD_WEAR',
        image: head_wear,
      },
      {
        krName: '의료품',
        enName: 'Medical',
        value: 'MEDICAL',
        link: '/item/MEDICAL',
        image: medical,
      },
      {
        krName: '컨테이너',
        enName: 'Container',
        value: 'CONTAINER',
        link: '/item/CONTAINER',
        image: container,
      },
      {
        krName: '전술 조끼',
        enName: 'Rig',
        value: 'RIG',
        link: '/item/RIG',
        image: rig,
      },
      {
        krName: '방탄 조끼',
        enName: 'Armor Vest',
        value: 'ARMOR_VEST',
        link: '/item/ARMOR_VEST',
        image: armor_vest,
      },
      {
        krName: '키',
        enName: 'Key',
        value: 'KEY',
        link: '/item/KEY',
        image: key,
      },
      {
        krName: '헤드셋',
        enName: 'Headset',
        value: 'HEADSET',
        link: '/item/HEADSET',
        image: headset,
      },
      {
        krName: '가방',
        enName: 'Bag',
        value: 'BAG',
        link: '/item/BAG',
        image: bag,
      },
    ],
  },
  {
    value: 'INFO',
    krName: '정보',
    enName: 'Info',
    image: quest,
    subMenu: [
      {
        krName: '보스',
        enName: 'Boss',
        value: 'BOSS',
        link: '/info/BOSS',
        image: boss,
      },
      {
        krName: '하이드아웃',
        enName: 'Hideout',
        value: 'HIDEOUT',
        link: '/info/HIDEOUT',
        image: hideout,
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
