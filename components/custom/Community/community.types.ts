import type { InformationInfo } from "../information/information.types";

export interface CommunityPost extends CommunityDetail {
  reaction_score: number;
  view_count: number;
}

export interface CommunityPostsResponse {
  total: number;
  max_page_count: number;
  posts: CommunityPost[];
  issue_posts: CommunityPost[];
  notice_posts: InformationInfo[];
}

export interface CommunityViewTypes {
  postInfo: CommunityPostsResponse;
  category: string;
}

export interface CommunityDataTypes {
  category: string;
}

export interface CategoryTabTypes {
  currentCategory: string;
}

export interface PostGridTypes {
  postInfo: CommunityPostsResponse;
  category: string;
}

export interface CommunitySideBarTypes {
  issue_posts: CommunityPost[];
  notice_posts: InformationInfo[];
  author_detail?: AuthorDetailDataTypes;
}

export interface ShareDialogTypes {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  url: string;
  title: string;
}

export interface ReportDialogTypes {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  subject: string;
  subjectId: string;
}

export interface CommunityDetail {
  user_email: string;
  slug: string;
  title: string;
  contents: string;
  delete_by_user: boolean;
  create_time: string;
  category: string;
  id: string;
  thumbnail: string | null;
  delete_by_admin: boolean;
  update_time: string;
  total_post_count: number;
  follower_count: number;
  view_count: number;
}

export interface CommunitDetailDataTypes {
  post_detail: CommunityDetail;
  issue_posts: CommunityPost[];
  notice_posts: InformationInfo[];
  author_detail: AuthorDetailDataTypes;
}

interface AuthorDetailDataTypes {
  user_email: string;
  nickname: string;
  posts_count: number;
  like_count: number;
  is_follow: number;
  post_id: string;
}

export interface CommunityDetailTypes {
  postInfo: CommunitDetailDataTypes;
}

export interface CommunityReactionTypes {
  postInfo: CommunityDetail;
}

export interface CommunityReactionDataTypes {
  id: string;
  is_like: number;
  is_bookmarked: number;
  like_count: number;
}

export interface FollowUserTypes {
  author_email: string;
}

export interface CheckFollowTypes {
  is_follow: number;
}
