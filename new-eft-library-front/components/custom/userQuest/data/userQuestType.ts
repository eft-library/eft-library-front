export interface UserQuest {
    npc_id: string;
    npc_name_kr: string;
    npc_name_en: string;
    npc_image: string;
    quest_info: UserQuestInfo[];
}

export interface UserQuestInfo {
    quest_id: string;
    quest_name_en: string;
    quest_name_kr: string;
    objectives_en: string[];
    objectives_kr: string[];
    requirements_en: string[];
    requirements_kr: string[];
    next: UserNextQuest[];
}

export interface UserNextQuest {
    url_mapping: string;
    id: string;
    name: string;
    name_kr: string;
}
export interface UserClientQuest{
    userQuestList: UserQuest[]
}

export interface FetchSchema {
    status: number;
    msg: string;
    data: UserQuest[];

}

export interface UserQuestList {
    userQuest: UserQuest;
    successQuest: (val: string, nextVal: any) => void;
    checkedQuest: string[];
    checkedBox: (val: string) => void;
}