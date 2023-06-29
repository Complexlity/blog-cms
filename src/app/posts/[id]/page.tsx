'use client'


import { Input } from '@/components/ui/input'
import { Post } from '@/lib/types'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

export default function SinglePost({ params }: { params: { id: string } }) {
  const id = params.id
  const router = useRouter()
  const url = `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/posts/${id}`
  const { data: post, error } = useQuery({
    queryKey: "post",
    queryFn: async () => {
      const res = await fetch(url)
      const post = await res.json()
      return post as unknown as  Post
    }
  })
  // if (error || !post) router.push('/')


  const { mutate: mutatePost, isLoading: deleting, isSuccess } = useMutation({
    mutationFn: async () => {
      const response = await fetch(url,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      const data = await response.json()
      if (!response.ok) {
        if (response.status === 403) {
            throw new Error(data.message)
          }
        }
      return data
    },
    onSuccess: () => {
      router.push('/posts')
    }
  })
  async function deletePost() {
    if (confirm("Do you want to delete")) {
      const result = mutatePost()
    }
  }

  if(deleting) return <p>Deleting Post...</p>


  if (post) {
      return (
           <PostElement post={post} deletePost={deletePost}/>
      );
  }
  }


const PostElement = ({ post, deletePost }: { post: Post, deletePost: () => void }) => {
  const [postInfo, setPostInfo] = useState(post)
  const [isEditing, setIsEditing] = useState(false)
  const postChanged: boolean = postInfo.content !== post.content && post._id === postInfo._id
  return (
    <div className="flex justify-center py-6 gap-4 px-4">
      <div className="max-w-[1000px] flex-1 ">

      {isEditing ? (
        <EditMode
        post={postInfo}
        setPost={setPostInfo}
        postChanged={postChanged}
        />
        ) : (
          <ViewMode post={postInfo} />
          )}

      <div className="Buttons flex gap-4 mt-4">
        <Button variant={"destructive"} onClick={deletePost}>
          Delete
        </Button>
        <Button
          variant={!isEditing ? "default" : "accepted"}
          onClick={setIsEditing.bind(null, !isEditing)}
          >
          {!isEditing ? "Edit" : "Done"}
        </Button>
        {postChanged && !isEditing && (
          <Button className="bg-green-600">Publish</Button>
          )}
      </div>
          </div>
    </div>
  );

  }


function EditMode({ post, setPost, postChanged }: { post: Post, setPost: Dispatch<SetStateAction<Post>>, postChanged: boolean }) {
  return (
    <div className="text-center grid gap-4 p-2 ">
      <Input className="text-base " value={post.title} onChange={(e) => {
        setPost({ ...post, title: e.target.value})
      }} />
      <Textarea className="text-base " value={post.content} onChange={(e) => {
        setPost({ ...post, content: e.target.value})
      }}/>
    </div>
  )
}

function ViewMode({ post }: { post: Post }) {
  return (<div className="text-center grid gap-4">
    <header className="flex items-center">
    <h1 className='flex-1 text-3xl font-bold font-mono tracking-wide'>{post.title}</h1>
      <span>by <span className='font-bold italic'>{post.author.name}</span></span>
    </header>
    <p className="text-xl">{post.content}</p>
  </div>
  )
}
