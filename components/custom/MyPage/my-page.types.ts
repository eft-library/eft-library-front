export interface DefaultInfoTypes {
  email: string;
  comment_count: number;
  post_count: number;
  follow_count: number;
}

export interface UpdateNicknameFormProps {
  onSuccess?: () => void; // 닉네임 변경 완료 후 callback
}

export interface UpdateNicknameWrapperTypes {
  open: boolean;
  setOpen: (open: boolean) => void;
}
