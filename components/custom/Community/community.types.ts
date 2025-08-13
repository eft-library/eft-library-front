import type { InformationInfo } from "../information/information.types";

export interface CommunityPost {
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

export interface CommunityDetailTypes {
  postInfo: CommunityPost;
}
