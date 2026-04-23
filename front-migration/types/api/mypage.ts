export interface UserBlockSummary {
  blocker_email: string;
  blocked_email: string;
  reason: string | null;
  create_time: string;
}

export interface UserInfoResponse {
  email: string;
  is_admin: boolean;
  attendance_count: number;
  nickname: string | null;
  create_time: string;
  last_update_nickname: string | null;
  start_time: string | null;
  end_time: string | null;
  reason: string | null;
  user_blocks: UserBlockSummary[];
}

export interface MyPageDefaultResponse {
  email: string;
  comment_count: number;
  post_count: number;
  follow_count: number;
  notification_count: number;
}

export interface MyPagePostEntry {
  id: string;
  slug: string;
  nickname: string | null;
  user_email: string;
  category: string;
  title: string;
  contents: string;
  thumbnail: string | null;
  delete_by_user: boolean;
  delete_by_admin: boolean;
  view_count: number | null;
  comment_count: number;
  reaction_score: number;
  create_time: string;
  update_time: string | null;
}

export interface MyPageCommentDetail {
  id: string;
  contents: string;
  user_email: string;
  nickname: string | null;
  create_time: string;
  update_time: string | null;
}

export interface MyPageCommentEntry extends MyPagePostEntry {
  comment: MyPageCommentDetail;
}

export interface MyPageBookmarkEntry extends MyPagePostEntry {}

export interface MyPageBlockEntry {
  blocker_email: string;
  blocked_email: string;
  nickname: string | null;
  reason: string | null;
  create_time: string;
}

export interface MyPageFollowEntry {
  following_email: string;
  follower_email: string;
  nickname: string | null;
  create_time: string;
  post_count: number;
}

export interface MyPageNotificationEntry {
  id: string;
  user_email: string;
  noti_type: string;
  payload: Record<string, unknown> | string | null;
  is_read: boolean;
  create_time: string;
}

export interface MyPagePagedBase {
  total_count: number;
  max_page_count: number;
}

export interface MyPagePostsResponse extends MyPagePagedBase {
  posts: MyPagePostEntry[];
}

export interface MyPageCommentsResponse extends MyPagePagedBase {
  comments: MyPageCommentEntry[];
}

export interface MyPageBookmarksResponse extends MyPagePagedBase {
  bookmarks: MyPageBookmarkEntry[];
}

export interface MyPageBlocksResponse extends MyPagePagedBase {
  blocks: MyPageBlockEntry[];
}

export interface MyPageFollowResponse extends MyPagePagedBase {
  follow: MyPageFollowEntry[];
}

export interface MyPageNotificationsResponse extends MyPagePagedBase {
  notifications: MyPageNotificationEntry[];
}
