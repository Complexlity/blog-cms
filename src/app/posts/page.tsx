'use client'

import { Post } from "@/lib/types"
import { useQuery } from "react-query"
import Card from "@/components/ui/card";


const POSTS = () => {
  const { data: posts, error, isLoading } = useQuery<Post[], Error>({
    queryKey: 'posts',
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/posts`)
      const posts = await res.json()
      return posts as unknown as Post[]
    }
  })
  if(isLoading) return <p>Loading...</p>
  if (posts) {
    return (
      <>
    <h1>These are all the posts in the store</h1>
    <div className="posts">
    {
     posts.map((post) => {
          return <Card key={post._id} post={post} />;
       })
      }
    </div>
    </>
   );
  }
}

export default POSTS;