export interface CreatePostRequest {
  date?: Date;
  author?: string;
  photo?: string;
  text?: string;
  category?: string;
  title?: string;
}

export interface CreatePostResponse {
  success: boolean;
  msg: string;
}
