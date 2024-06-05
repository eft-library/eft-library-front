import { createStore } from "zustand";
import { persist, devtools } from "zustand/middleware";

// 상태와 업데이트 함수의 타입 정의
interface AppState {
  bossId: string;
  setBossId: (value: string) => void;
  allColumn: Record<string, any>;
  setColumn: (value: Record<string, any>) => void;
  weaponCategory: string;
  setWeaponCategory: (value: string) => void;
  npcId: string;
  setNpcId: (value: string) => void;
  itemFilter: any[];
  setItemFilter: (value: any[]) => void;
}

// 임시로 사용할 객체의 타입 정의
interface ObjectType {
  [key: string]: any;
}

// zustand store 생성
export const useStore = createStore(
  // 상태를 영구적으로 유지하는데 도움을 주는 persist middleware 적용
  persist(
    // 개발자 도구를 사용할 수 있게 해주는 devtools middleware 적용
    devtools(
      // 초기 상태 설정
      (set) => ({
        bossId: "RESHALA",
        setBossId: (value: string) =>
          set((state: AppState) => ({ ...state, bossId: value })),
        allColumn: {},
        setColumn: (value: ObjectType) =>
          set((state: AppState) => ({ ...state, allColumn: value })),
        weaponCategory: "ALL",
        setWeaponCategory: (value: string) =>
          set((state: AppState) => ({ ...state, weaponCategory: value })),
        npcId: "PRAPOR",
        setNpcId: (value: string) =>
          set((state: AppState) => ({ ...state, npcId: value })),
        itemFilter: [],
        setItemFilter: (value: ObjectType[]) =>
          set((state: AppState) => ({ ...state, itemFilter: value })),
      }),
      // Devtools에서 스토어의 이름 설정
      { name: "store" }
    ),
    // 상태를 저장하는 데 사용할 스토리지 설정
    {
      name: "app-storage",
    }
  )
);
