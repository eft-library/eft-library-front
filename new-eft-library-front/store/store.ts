// store.ts
import { createStore } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  icon: string;
  name: string;
  point: number;
  is_admin: boolean;
  create_time: string;
  update_time: string | null;
  email: string;
  nick_name: string;
  grade: number;
  attendance_count: number;
  attendance_time: string;
}

interface Comment extends Ban {
  id: string;
  board_id: string;
  board_type: string;
  parent_id: string | null;
  parent_nick_name: string | null;
  contents: string;
  depth: number;
  create_time: string;
  update_time: string | null;
  is_delete_by_admin: boolean;
  is_delete_by_user: boolean;
  like_count: number;
  dislike_count: number;
  root_id: string;
  path: string[];
  icon: string;
  nick_name: string;
  root_create_time: string;
  is_liked_by_user: boolean;
  is_disliked_by_user: boolean;
}

interface PostData {
  id: string;
  title: string;
  contents: string;
  thumbnail: string | null;
  writer: string;
  like_count: number;
  view_count: number;
  type: string;
  type_kr: string;
  create_time: string;
  update_time: string | null;
  icon: string;
  nick_name: string;
  comment_cnt: number;
}

interface Ban {
  user_email: string;
  ban_reason: string | null;
  ban_start_time: string | null;
  ban_end_time: string | null;
}

interface UserPostStatistics {
  user_email: string;
  post_count: number;
  comment_count: number;
}

interface UserProfile {
  user: User;
  grade: string;
  icon_list: string[];
  ban: Ban;
  user_posts: PostData[];
  user_post_statistics: UserPostStatistics;
  user_comments: Comment[];
}
interface SubItem {
  value: string;
  kr: string;
  en: string;
}

interface Item {
  value: string;
  kr: string;
  en: string;
  sub: SubItem[];
}

export type AppStateType = {
  weaponCategory: string;
  keyCategory: string;
  npcId: string;
  itemFilter: Item[];
  medicalCategory: string;
  ammoCategory: string;
  lootCategory: string;
  hideoutCategory: string;
  eventNum: number;
  patchNotesNum: number;
  user: UserProfile | null;
  searchUser: string;
};

export type AppActionsType = {
  setWeaponCategory: (value: string) => void;
  setKeyCategory: (value: string) => void;
  setNpcId: (value: string) => void;
  setItemFilter: (value: Item[]) => void;
  setMedicalCategory: (value: string) => void;
  setAmmoCategory: (value: string) => void;
  setLootCategory: (value: string) => void;
  setHideoutCategory: (value: string) => void;
  setEventNum: (value: number) => void;
  setPatchNotesNum: (value: number) => void;
  setUser: (value: UserProfile) => void;
  setSearchUser: (value: string) => void;
};

export type AppStoreType = AppStateType & AppActionsType;

export const defaultInitState: AppStateType = {
  weaponCategory: "ALL",
  keyCategory: "CUSTOMS",
  npcId: "PRAPOR",
  medicalCategory: "ALL",
  ammoCategory: "ALL",
  lootCategory: "ALL",
  hideoutCategory: "5d388e97081959000a123acf",
  itemFilter: [],
  eventNum: 1,
  patchNotesNum: 1,
  user: null,
  searchUser: "",
};

export const createAppStore = (initState: AppStateType = defaultInitState) => {
  return createStore<AppStoreType>()(
    persist(
      (set) =>
        ({
          ...initState,
          setWeaponCategory: (value: string) => set({ weaponCategory: value }),
          setKeyCategory: (value: string) => set({ keyCategory: value }),
          setNpcId: (value: string) => set({ npcId: value }),
          setItemFilter: (value: Item[]) => set({ itemFilter: value }),
          setMedicalCategory: (value: string) =>
            set({ medicalCategory: value }),
          setAmmoCategory: (value: string) => set({ ammoCategory: value }),
          setLootCategory: (value: string) => set({ lootCategory: value }),
          setHideoutCategory: (value: string) =>
            set({ hideoutCategory: value }),
          setEventNum: (value: number) => set({ eventNum: value }),
          setPatchNotesNum: (value: number) => set({ patchNotesNum: value }),
          setUser: (value: UserProfile) => set({ user: value }),
          setSearchUser: (value: string) => set({ searchUser: value }),
        } satisfies AppStoreType),
      {
        name: "app-store",
      }
    )
  );
};
