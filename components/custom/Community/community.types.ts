import type { InformationInfo } from "../information/information.types";

export interface CommunityPost extends CommunityDetail {
  reaction_score: number;
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

export interface PostGridTypes {
  postInfo: CommunityPostsResponse | DetailPostListsTypes;
  category: string;
  currentPageNum?: number;
  currentPostId?: string;
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
  comment_count: number;
  nickname: string;
}

export interface CommunitDetailDataTypes {
  post_detail: CommunityDetail;
  issue_posts: CommunityPost[];
  notice_posts: InformationInfo[];
  author_detail: AuthorDetailDataTypes;
  posts: DetailPostListsTypes;
}

interface DetailPostListsTypes {
  total: number;
  max_page_count: number;
  posts: CommunityPost[];
  current_page_num: number;
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

export interface CommentSectionTypes {
  postInfo: CommunityDetail;
}

export interface CommentListsTypes {
  total: number;
  max_page_count: number;
  current_page_num: number;
  comments: CommentDataTypes[];
  issue_comments: CommentDataTypes[];
}

export interface CommentDataTypes {
  id: string;
  parent_id: string | null;
  post_id: string;
  path: string;
  user_email: string;
  contents: string;
  delete_by_user: boolean;
  delete_by_admin: boolean;
  create_time: string;
  update_time: string;
  like_count: number;
  dislike_count: number;
  depth: number;
  is_like: number;
  parent_nickname: string;
  nickname: string;
}

export interface CommentTypes {
  postInfo: CommunityDetail;
  comment: CommentDataTypes;
  setReportOpen: React.Dispatch<
    React.SetStateAction<{ open: boolean; id: string }>
  >;
}

export interface IssueCommentTypes {
  postInfo: CommunityDetail;
  comment: CommentDataTypes;
}

export interface CommunityWriteTypes {
  postInfo: CommunityDetail | null;
  writeType: "create" | "update";
  pageTitle: string;
}

export interface PostWithComments extends CommunityPost {
  comment: PostSearchCommentsTypes;
}

export interface PostSearchCommentsTypes {
  id: string;
  user_email: string;
  contents: string;
  update_time: string;
  create_time: string;
}

export interface PostWithCommentsSearchTypes {
  total_count: number;
  max_page_count: number;
  search_result: PostWithComments[];
}
export interface SearchResultViewTypes {
  postInfo: PostWithCommentsSearchTypes;
}
