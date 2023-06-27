'use client'

import { Post } from "@/lib/types";
import { useState, createContext, useContext } from "react";

export type GlobalPosts = {
  posts: Post[];
  setPosts: (c: Post[]) => void;
};
const PostsContext = createContext<GlobalPosts>({
  posts: [],
  setPosts: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const usePostsContext = () => useContext(PostsContext);

const PostsContextProvider = ({ children }: Props) => {
  const [posts, setPosts] = useState<Post[]>([]);

  return (
    <PostsContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostsContext.Provider>
  );
};

export default PostsContextProvider;
