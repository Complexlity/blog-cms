import Post from '@/app/posts/[id]/Post'
import { getSinglePost, getUser } from '@/lib/serverFunctions'


export default async function SinglePost({ params }: { params: { id: string } }) {
  return <Post  />

}