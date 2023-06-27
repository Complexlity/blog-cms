'use client'

import { useRouter } from 'next/navigation'
import { Post } from '@/lib/types'

export default function Post({ post }: { post: Post }) {
  const router = useRouter()
  async function deletePost() {
    if (confirm('Do you want to delete')) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/posts/${post._id}`, {
          method: 'DELETE',
          credentials: 'include'
        })

        if (!response.ok) {
          const message = (await response.json()).message
          return alert(message)
        }
        router.push("/")
      } catch (error: any) {
        // alert(error.message)
      }
    }
  }
  return (
    <>
      <h1>Post by: {post.author.name}</h1>
      <h2 className="font-bold text-3xl">{post.title}</h2>
      <p>{post.content}</p>
      <>
        <button onClick={deletePost}>
          Delete
        </button>
      </>
    </>
  );
}