import Post from '@/app/posts/[id]/Post'
import { getSinglePost, getUser } from '@/lib/serverFunctions'
import { Heart } from 'lucide-react'

export default async function SinglePost({ params }: { params: { id: string } }) {
  const user = await getUser()
  const post = await getSinglePost(params.id)
  console.log(post)
  return <Post post={post} />

}