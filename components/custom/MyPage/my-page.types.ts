/* eslint-disable @typescript-eslint/no-explicit-any */
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
  nickname: string;
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

export interface BookmarksTypes {
  total_count: number;
  max_page_count: number;
  bookmarks: PostTypes[];
}

export interface FollowingTypes {
  total_count: number;
  max_page_count: number;
  follow: FollowTypes[];
}

interface FollowTypes {
  following_email: string;
  create_time: string;
  nickname: string;
  post_count: number;
}

export interface BlocksTypes {
  total_count: number;
  max_page_count: number;
  blocks: BlockTypes[];
}

interface BlockTypes {
  blocker_email: string;
  blocked_email: string;
  nickname: string;
  reason: string;
  create_time: string;
}

export interface NotificationsTypes {
  total_count: number;
  max_page_count: number;
  notifications: NotificationTypes[];
}

export interface NotificationTypes {
  user_email: string;
  noti_type: string;
  payload: any;
  is_read: string;
  created_time: string;
}

export interface WithdrawModalTypes {
  setShowWithdrawModal: (open: boolean) => void;
}
