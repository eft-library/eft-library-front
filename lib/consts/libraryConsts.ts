export const MOT_IMAGE_SLIDER_OPTION = {
  dots: false,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
  autoplaySpeed: 3000,
  draggable: false,
} as const;

export const MAIN_IMAGE_SLIDER_OPTION = {
  dots: false,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  draggable: false,
} as const;

export const previewData = [
  {
    npc_id: "PRAPOR",
    npc_name_kr: "프라퍼",
    npc_name_en: "Prapor",
    npc_image: "/tkl_quest/npc/prapor.webp",
    quest_info: [
      {
        next: [],
        quest_id: "5fd9fad9c1ce6b1a3b486d00",
        objectives_en: [
          'Find Prapors missing convoy on <a href="/map-of-tarkov/WOODS" target=" _blank" class="highlight_quest">Woods</a>',
          "Locate the temporary USEC camp",
          "Survive and extract from the location",
        ],
        url_mapping: "search-mission",
        objectives_kr: [
          '<a href="/map-of-tarkov/WOODS" target=" _blank" class="highlight_quest">삼림</a>에서 Prapor의 실종된 호송대 찾기',
          "임시 USEC 캠프 찾기",
          "생존하고 해당 위치에서 탈출하세요",
        ],
        quest_name_en: "Search Mission",
        quest_name_kr: "수색 임무 (Search Mission)",
        requirements_en: ["Must be level 5 to start this quest."],
        requirements_kr: ["이 퀘스트는 레벨 5부터 시작할 수 있습니다."],
      },
      {
        next: [
          {
            id: "59c124d686f774189b3c843f",
            name: "BP Depot",
            name_kr: "BP 연료 확보",
            is_other: false,
            url_mapping: "bp-depot",
          },
        ],
        url_mapping: "bp-depot",
        quest_id: "59674eb386f774539f14813a",
        objectives_en: [
          'Obtain the secure folder in the Tarcone Directors office at the <a href="/map-of-tarkov/CUSTOMS" target=" _blank" class="highlight_quest">Customs</a> terminal warehouse',
          'Stash the package in the <a href="/map-of-tarkov/FACTORY" target=" _blank" class="highlight_quest">Factory</a> break room (2nd floor near Gate 3)',
          'Survive and extract from <a href="/map-of-tarkov/FACTORY" target=" _blank" class="highlight_quest">Factory</a>',
        ],
        objectives_kr: [
          '<a href="/map-of-tarkov/CUSTOMS" target=" _blank" class="highlight_quest">세관</a> 터미널에 있는 Tarcone 회사 감독관의 사무실(빨간창고)에서 보안 케이스 획득하기',
          '<a href="/map-of-tarkov/FACTORY" target=" _blank" class="highlight_quest">공장</a> 3번 게이트 근처 2층에 있는 휴게실에 케이스 놓고 가기',
          '<a href="/map-of-tarkov/FACTORY" target=" _blank" class="highlight_quest">공장</a>에서 살아서 탈출하기',
        ],
        quest_name_en: "Delivery From the Past",
        quest_name_kr: "과거에서 온 배달 (Delivery From the Past)",
        requirements_en: ["Must be level 5 to start this quest."],
        requirements_kr: ["이 퀘스트는 레벨 5부터 시작할 수 있습니다."],
      },
    ],
  },
  {
    npc_id: "THERAPIST",
    npc_name_kr: "테라피스트",
    npc_name_en: "Therapist",
    npc_image: "/tkl_quest/npc/therapist.webp",
    quest_info: [
      {
        next: [
          {
            id: "64f3176921045e77405d63b5",
            name: "Ambulances Again",
            name_kr: "다시 구급차",
            is_other: false,
            url_mapping: "ambulances-again",
          },
          {
            id: "64e7b971f9d6fa49d6769b44",
            name: "The Huntsman Path - Big Game",
            name_kr: "사냥꾼의 길 - 빅 게임",
            is_other: false,
            url_mapping: "the-huntsman-path-big-game",
          },
        ],
        url_mapping: "urban-medicine",
        quest_id: "639135e0fa894f0a866afde6",
        objectives_en: [
          'Locate the chemical laboratory on <a href="/map-of-tarkov/STREET_OF_TARKOV" target="_blank" class="highlight_quest">Streets of Tarkov</a>',
          "Obtain the container with drug samples",
          "Hand over the container",
        ],
        objectives_kr: [
          '<a href="/map-of-tarkov/STREET_OF_TARKOV" target="_blank" class="highlight_quest">타르코프 시내</a>에 위치한 화학 실험실 찾기',
          "약물이 담긴 보관함 찾기",
          "보관함 건네주기",
        ],
        quest_name_en: "Urban Medicine",
        quest_name_kr: "도시 약품 (Urban Medicine)",
        requirements_en: ["Must be level 17 to start this quest."],
        requirements_kr: ["이 퀘스트는 레벨 17부터 시작할 수 있습니다."],
      },
      {
        next: [
          {
            id: "beneath_the_streets",
            name: "Beneath The Streets",
            name_kr: "지하도시",
            is_other: false,
            url_mapping: "beneath-the-streets",
          },
        ],
        quest_id: "6573387d0b26ed4fde798de3",
        url_mapping: "pets-won-t-need-it-part-2",
        objectives_en: [
          'Locate the first pharmacy on Primorsky Ave on <a href="/map-of-tarkov/STREET_OF_TARKOV" target="_blank" class="highlight_quest">Streets of Tarkov</a>',
          'Locate the second pharmacy on Primorsky Ave on <a href="/map-of-tarkov/STREET_OF_TARKOV" target="_blank" class="highlight_quest">Streets of Tarkov</a>',
          'Locate the third pharmacy at Cardinal apartment complex on <a href="/map-of-tarkov/STREET_OF_TARKOV" target="_blank" class="highlight_quest">Streets of Tarkov</a>',
          "Survive and extract from the location",
        ],
        objectives_kr: [
          '<a href="/map-of-tarkov/STREET_OF_TARKOV" target="_blank" class="highlight_quest">타르코프 시내</a> Primorsky Ave에서 첫 번째 약국 찾기',
          '<a href="/map-of-tarkov/STREET_OF_TARKOV" target="_blank" class="highlight_quest">타르코프 시내</a> Primorsky Ave에서 두 번째 약국 찾기',
          '<a href="/map-of-tarkov/STREET_OF_TARKOV" target="_blank" class="highlight_quest">타르코프 시내</a> Cardinal 아파트 단지에서 세 번째 약국 찾기',
          "살아서 탈출하기",
        ],
        quest_name_en: "Pets Won't Need It - Part 2",
        quest_name_kr:
          "펫에게는 필요하지 않습니다 - 파트 2 (Pets Won't Need It - Part 2)",
        requirements_en: [],
        requirements_kr: [],
      },
    ],
  },
];
