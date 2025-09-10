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
  follower_email: string;
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

export interface UnBlockTypes {
  blockInfo: BlockTypes | null;
  setDeleteBlock: React.Dispatch<
    React.SetStateAction<{
      blockInfo: BlockTypes | null;
      deleteOpen: boolean;
    }>
  >;
}

export interface DeleteBlockTypes {
  blockInfo: BlockTypes | null;
  deleteOpen: boolean;
}

export interface UnfollowTypes {
  followInfo: FollowTypes | null;
  setDeleteFollow: React.Dispatch<
    React.SetStateAction<{
      followInfo: FollowTypes | null;
      deleteOpen: boolean;
    }>
  >;
}

export interface UnfollowStateTypes {
  followInfo: FollowTypes | null;
  deleteOpen: boolean;
}

export interface DeleteBookmarkTypes {
  bookmarkInfo: PostTypes | null;
  setDeleteBookmark: React.Dispatch<
    React.SetStateAction<{
      postInfo: PostTypes | null;
      deleteOpen: boolean;
    }>
  >;
}

export interface DeleteBookmarkStateTypes {
  postInfo: PostTypes | null;
  deleteOpen: boolean;
}

export interface DeletePostTypes {
  postInfo: PostTypes | null;
  setDeletePost: React.Dispatch<
    React.SetStateAction<{
      postInfo: PostTypes | null;
      deleteOpen: boolean;
    }>
  >;
}

export interface DeletePostStateTypes {
  postInfo: PostTypes | null;
  deleteOpen: boolean;
}

export interface DeleteCommentTypes {
  commentInfo: CommentTypes | null;
  setDeleteComment: React.Dispatch<
    React.SetStateAction<{
      commentInfo: CommentTypes | null;
      deleteOpen: boolean;
    }>
  >;
}

export interface DeleteCommentStateTypes {
  commentInfo: CommentTypes | null;
  deleteOpen: boolean;
}
