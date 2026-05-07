export interface CommunityPost {
  id: string;
  slug: string;
  user_email: string;
  nickname: string | null;
  category: string;
  title: string;
  contents: string;
  thumbnail: string | null;
  delete_by_user: boolean;
  delete_by_admin: boolean;
  create_time: string;
  update_time: string | null;
  view_count: number | null;
  comment_count: number | null;
  reaction_score: number | null;
  is_like?: number | null;
  is_bookmarked?: boolean | null;
  comment?: string | null;
}

export interface CommunityListResponse {
  total: number;
  max_page_count: number;
  posts: CommunityPost[];
}

export interface CommunityAuthorDetail {
  user_email: string;
  nickname: string | null;
  posts_count: number | null;
  like_count: number | null;
  is_follow: boolean | number | null;
  post_id?: string;
}

export interface CommunityDetailResponse {
  post_detail: CommunityPost;
  author_detail: CommunityAuthorDetail | null;
  posts: CommunityRelatedPosts;
}

export interface CommunityRelatedPosts {
  total: number;
  max_page_count: number;
  current_page_num: number;
  posts: CommunityPost[];
}

export interface CommunitySideNotice {
  id: string;
  information_type: string;
  title_ko?: string | null;
  title_en?: string | null;
  title_ja?: string | null;
  update_time?: string | null;
}

export interface CommunitySideResponse {
  issue_posts: CommunityPost[];
  notice_posts: CommunitySideNotice[];
}

export interface CommunitySearchResponse {
  total_count: number;
  max_page_count: number;
  search_result: CommunityPost[];
}

export interface CommunityMetaData {
  id: string;
  is_like: number | null;
  is_bookmarked: boolean | number | null;
  like_count: number;
}

export interface CommunityComment {
  id: string;
  parent_id: string | null;
  post_id: string;
  path: string | null;
  user_email: string;
  contents: string;
  delete_by_user: boolean;
  delete_by_admin: boolean;
  create_time: string;
  update_time: string | null;
  like_count: number;
  dislike_count: number;
  depth: number;
  is_like: number | null;
  parent_nickname: string | null;
  nickname: string | null;
}

export interface CommunityCommentsResponse {
  comments: CommunityComment[];
  issue_comments: CommunityComment[];
  total: number;
  max_page_count: number;
  current_page_num: number;
}

export interface CommunityMutationResult {
  result?: number | unknown[];
  url?: string;
}
