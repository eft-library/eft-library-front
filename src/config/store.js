import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useQuestStore = create(
  persist(
    (set) => ({
      npcId: 'PRAPOR',
      setNpcId: (npc) => set(() => ({ npcId: npc })),
    }),
    {
      name: 'quest-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export const useBossStore = create(
  persist(
    (set) => ({
      bossId: 'RESHALA',
      setNpcId: (boss) => set(() => ({ bossId: boss })),
    }),
    {
      name: 'boss-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export const useScrollStore = create(
  persist(
    (set) => ({
      scrollY: 0, // 초기 스크롤 위치
      scrollX: 0,
      setScrollY: (value) => set({ scrollY: value }), // 스크롤 위치 업데이트 함수
      setScrollX: (value) => set({ scrollX: value }), // 스크롤 위치 업데이트 함수
    }),
    {
      name: 'scroll-position', // 지속성 이름
    },
  ),
);
