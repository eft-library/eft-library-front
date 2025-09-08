export interface DefaultInfoTypes {
  email: string;
  comment_count: number;
  post_count: number;
  follow_count: number;
}

export interface UpdateNicknameFormProps {
  onSuccess?: () => void;
}

export interface MyPageViewTypes {
  route: string;
}

export interface UpdateNicknameWrapperTypes {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export interface ProfileTypes {
  email: string;
  attendance_count: number;
  nickname: string;
  is_admin: boolean;
  last_update_nickname: string;
  end_time: string;
  create_time: string;
  start_time: string;
  reason: string;
  user_blocks: UserBlock[];
}

interface UserBlock {
  reason: string;
  create_time: string;
  blocked_email: string;
  blocker_email: string;
}
