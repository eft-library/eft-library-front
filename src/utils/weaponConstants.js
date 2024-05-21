export const WEAPON_TYPE = [
  { value: 'ALL', desc_kr: '전체', desc_en: 'All' },
  { value: 'Assault carbine', desc_kr: '카빈 소총', desc_en: '카빈 소총' },
  { value: 'Assault rifle', desc_kr: '돌격 소총', desc_en: '돌격 소총' },
  { value: 'Machinegun', desc_kr: '경기관총', desc_en: '경기관총' },
  { value: 'SMG', desc_kr: '기관단총', desc_en: '기관단총' },
  { value: 'Sniper rifle', desc_kr: '볼트액션 소총', desc_en: '볼트액션 소총' },
  {
    value: 'Marksman rifle',
    desc_kr: '지정사수 소총',
    desc_en: '지정사수 소총',
  },
  { value: 'Shotgun', desc_kr: '산탄총', desc_en: '산탄총' },
  { value: 'Grenade launcher', desc_kr: '유탄발사기', desc_en: '유탄발사기' },
  { value: 'Handgun', desc_kr: '권총', desc_en: '권총' },
  {
    value: 'Stationary weapons',
    desc_kr: '거치식 화기',
    desc_en: '거치식 화기',
  },
  { value: 'Knife', desc_kr: '근접 무기', desc_en: '근접 무기' },
  { value: 'Throwable weapon', desc_kr: '투척 무기', desc_en: '투척 무기' },
  { value: 'Special weapons', desc_kr: '특수 무기', desc_en: '특수 무기' },
];

export const GUN_CATEGORY_LIST = [
  'Assault carbine',
  'Assault rifle',
  'Machinegun',
  'SMG',
  'Sniper rifle',
  'Marksman rifle',
  'Shotgun',
  'Grenade launcher',
  'Handgun',
];

export const WEAOPN_COLUMN = [
  '사진',
  '이름',
  '탄창',
  '발사모드',
  '발사속도',
  '인체공학',
  '수평반동',
  '수직반동',
];

export const KNIFE_COLUMN = [
  '사진',
  '이름',
  '기본 데미지',
  '찌르기 데미지',
  '기본 공격 범위',
];

export const THROWABLE_COLUMN = [
  '사진',
  '이름',
  '폭발 지연',
  '폭발 거리',
  '파편 반경',
];

export const STATIONARY_COLUMN = [
  '사진',
  '이름',
  '탄약통',
  '발사모드',
  '발사 속도',
];
