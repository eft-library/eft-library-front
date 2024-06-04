import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';

export const useStore = create(
  devtools(
    persist(
      (set) => ({
        // Boss
        bossId: 'RESHALA',
        setBossId: (value) => set((state) => ({ ...state, bossId: value })),

        // Column
        allColumn: {},
        setColumn: (value) => set((state) => ({ ...state, allColumn: value })),

        // 무기
        weaponCategory: 'ALL',
        setWeaponCategory: (value) =>
          set((state) => ({ ...state, weaponCategory: value })),

        // Quest
        npcId: 'PRAPOR',
        setNpcId: (value) => set((state) => ({ ...state, npcId: value })),

        // Item Filter
        itemFilter: [],
        setItemFilter: (value) =>
          set((state) => ({ ...state, itemFilter: value })),
      }),
      {
        name: 'app-storage',
        storage: createJSONStorage(() => sessionStorage),
      },
    ),
    { name: 'store' }, // Devtools에서 스토어의 이름 설정
  ),
);
