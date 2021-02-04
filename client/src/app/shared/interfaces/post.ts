export interface Post {
  author: string;
  category: string;
  date: string;
  photo: string;
  text: string;
  title: string;
  __v: number;
  _id: string;
}

export interface DeletePostResponse {
  success: boolean;
  msg: string;
}
