'use client'

import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/input'
import { Post } from '@/lib/types'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useState } from 'react'
import { useMutation, useQuery } from 'react-query'

export default function SinglePost({ params }: { params: { id: string } }) {
  const id = params.id
  const router = useRouter()
  console.log({id})
  const url = `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/posts/${id}`
  console.log({url})
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

type PostInfo = {
  title: string,
  content: string
  }

const PostElement = ({ post, deletePost }: { post: Post, deletePost: any }) => {
  const [postInfo, setPostInfo] = useState<PostInfo>({ title: post.title, content: post.content})
  const [isEditing, setIsEditing] = useState(false)
  const postChanged: boolean = postInfo.content !== post.content
  return (
    <>
      {isEditing ? (
        <EditMode
          post={postInfo}
          setPostInfo={setPostInfo}
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
          variant={!isEditing ? "default" : "secondary"}
          onClick={setIsEditing.bind(null, !isEditing)}
        >
          {!isEditing ? "Edit" : "Done"}
        </Button>
        {postChanged && !isEditing && (
          <Button className="bg-green-600">Publish</Button>
        )}
      </div>
    </>
  );
  //   return (
  //     <>
  // <h1>Post by: {post.author.name}</h1>
  //         <h2 className="font-bold text-3xl">{post.title}</h2>
  //       {isEditing
  //       ?  < Input value={editable} onChange={(e) => setEditable(e.target.value)} className='max-w-24 w-4/5 text-md' />
  //       :
  //         <p className='py-2'>{editable}</p>
  //       }
  //       <div className="Buttons flex gap-4 mt-4">
  //       <Button variant={'destructive'} onClick={deletePost}>Delete</Button>
  //         <Button variant={!isEditing ? "default" : "secondary"} onClick={setIsEditing.bind(null, !isEditing)}>{!isEditing ? "Edit" : "Done"}</Button>
  //         {postChanged && !isEditing && <Button className="bg-green-600">Publish</Button>}
  //       </div>
  //     </>
  //   );
  }


function EditMode({ post, setPostInfo, postChanged }: { post: PostInfo, setPostInfo: Dispatch<SetStateAction<PostInfo>>, postChanged: boolean }) {
  return <p>Edit Mode</p>
}

function ViewMode({ post }: { post: PostInfo }) {
  return <p>View Mode</p>
}
