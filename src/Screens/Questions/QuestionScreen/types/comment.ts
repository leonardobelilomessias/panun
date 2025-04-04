export interface Comment {
  id: string;
  content: string;
  created_at: string;
  users: {
    id: string;
    name: string;
    avatar_url: string;
  }
} 