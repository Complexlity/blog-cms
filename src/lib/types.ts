export interface User {
  _id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  session: string;
  iat: number;
  exp: number;
}

export interface Post {
  _id: string;
  title: string;
  content: string;
  author: User;
  published: boolean;
  comments: {}[];
  likes: string[];
  likeCount: number;
  createdAt: Date;
  updatedAt: Date;
}