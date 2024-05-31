import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';

export const useStore = create(
  devtools(
    persist(
      (set) => ({
        // Boss
        bossId: 'RESHALA',
        setBossId: (boss) => set((state) => ({ ...state, bossId: boss })),

        // Column
        allColumn: {},
        setColumn: (columnInfo) =>
          set((state) => ({ ...state, allColumn: columnInfo })),

        // 무기
        weaponCategory: 'ALL',
        setWeaponCategory: (category) =>
          set((state) => ({ ...state, weaponCategory: category })),

        // Quest
        npcId: 'PRAPOR',
        setNpcId: (npc) => set((state) => ({ ...state, npcId: npc })),
      }),
      {
        name: 'app-storage',
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
    { name: 'store' }, // Devtools에서 스토어의 이름 설정
  ),
);
