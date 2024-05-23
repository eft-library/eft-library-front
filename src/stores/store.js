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

export const useWeaponStore = create(
  persist(
    (set) => ({
      weaponCategory: 'ALL',
      setWeaponCategory: (category) =>
        set(() => ({ weaponCategory: category })),
    }),
    {
      name: 'weapon-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

export const useBossStore = create(
  persist(
    (set) => ({
      bossId: 'RESHALA',
      setBossId: (boss) => set(() => ({ bossId: boss })),
    }),
    {
      name: 'boss-storage',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
