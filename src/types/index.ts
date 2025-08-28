export interface User {
  id: string;
  email: string;
  name: string;
  bio?: string;
  location?: string;
  profile_picture?: string;
  created_at: string;
}

export interface Post {
  id: string;
  user_id: string;
  content: string;
  image_url?: string;
  created_at: string;
  user?: User;
  likes_count: number;
  comments_count: number;
  user_has_liked: boolean;
}

export interface Comment {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  created_at: string;
  user?: User;
}

export interface Like {
  id: string;
  post_id: string;
  user_id: string;
  created_at: string;
}