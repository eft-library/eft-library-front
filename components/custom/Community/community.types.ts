export interface CommunityPost {
  user_email: string;
  slug: string;
  title: string;
  contents: string;
  delete_by_user: boolean;
  create_time: string;
  category: string;
  id: number;
  thumbnail: string | null;
  delete_by_admin: boolean;
  update_time: string;
}

export interface CommunityPostsResponse {
  total: number;
  posts: CommunityPost[];
}

export interface CommunityViewTypes {
  postInfo: CommunityPostsResponse;
}

export interface CommunityDataTypes {
  category: string;
}
