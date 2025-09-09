export interface DefaultInfoTypes {
  email: string;
  comment_count: number;
  post_count: number;
  follow_count: number;
  notification_count: number;
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

export interface PostsTypes {
  total_count: number;
  max_page_count: number;
  posts: PostTypes[];
}

interface PostTypes {
  id: string;
  slug: string;
  user_email: string;
  category: string;
  title: string;
  contents: string;
  thumbnail: string;
  view_count: number;
  comment_count: number;
  reaction_score: number;
  create_time: string;
  update_time: string;
}

export interface CommentsTypes {
  total_count: number;
  max_page_count: number;
  comments: CommentTypes[];
}

interface CommentTypes extends PostTypes {
  comment: CommentDataTypes;
}

interface CommentDataTypes {
  id: string;
  contents: string;
  user_email: string;
  create_time: string;
  nickname: string;
  update_time: string;
}
