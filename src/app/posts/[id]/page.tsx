'use client'


import { Input } from '@/components/ui/input'
import { Post } from '@/lib/types'
import { useRouter } from 'next/navigation'
import { Dispatch, MouseEventHandler, SetStateAction, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import { AlertCircle } from 'lucide-react'
import axios from 'axios'

export default function SinglePost({ params }: { params: { id: string } }) {
  const [deleteError, setDeleteError] = useState('')
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
        if (response.status === 403 || response.status === 401) {
          setDeleteError(data.message)
            throw new Error(data.message)
        }
      }
      router.push('/posts')
      return data
    },
  })
  async function deletePost() {
    if (confirm("Do you want to delete")) {
      const result = mutatePost()
    }
  }

  if(deleting) return <p>Deleting Post...</p>


  if (post) {
    return (
        <>
        <PostElement post={post} deletePost={deletePost} />
        {deleteError && (
          <Alert variant={"destructive"}>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{deleteError}</AlertDescription>
        </Alert>
      )}
      </>
      );
  }
  }

type UpdatePost = {
  title: string,
  content: string

}



const PostElement = ({ post, deletePost }: { post: Post, deletePost: () => void }) => {
  const [postInfo, setPostInfo] = useState(post)
  const [isEditing, setIsEditing] = useState(false)
  const postChanged: boolean = (postInfo.content !== post.content || postInfo.title !== post.title) && post._id === postInfo._id
  const url = `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/posts/${post._id}`;
  const [updateResult, setUpdateResult] = useState({
    type: "",
    message: ''
  })
const {
  mutate: updatePost,
  isLoading: updating,
  isSuccess,
} = useMutation({
  mutationFn: async (values: UpdatePost) => {
    const response = await fetch(url, {
      method: "PATCH",
      headers:  {
        "Content-type": 'application/json'
      },
      credentials: "include",
      body: JSON.stringify(values),
    });
    const data = await response.json();
    if (!response.ok) {
      if (response.status === 403 || response.status === 404) {
        setUpdateResult({ type: "Error", message: data.message})
      }
    }
    else setUpdateResult({ type: "Success", message: "Message Updated Successful" });
    return data;
  },
});


  const saveToDatabase = async (post: Post) => {
    const updatePostValues = {
      title: post.title,
      content: post.content,
    }
    if (confirm("Are you sure you want to update the post?")) {
      setUpdateResult({type: "Success", message: "Loading"})
      updatePost(updatePostValues)
    }
  }
  async function togglePublish(e: any) {
    setPostInfo({ ...postInfo, published: !postInfo.published });
    e.target.disabled = true;
    await axios.patch(
      url,
      { published: !post.published },
      { withCredentials: true }
    );
    e.target.disabled = false;
  }

  return (
    <div className="flex flex-col justify-center py-6 gap-4 px-4">
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
            variant={!isEditing ? "outline" : "accepted"}
            onClick={setIsEditing.bind(null, !isEditing)}
          >
            {!isEditing ? "Edit" : "Cancel"}
          </Button>
          {!isEditing ? <Button onClick={togglePublish} className={postInfo.published ? "" : `bg-green-700 hover:bg-green-700/80`}>{postInfo.published ? "Unpublish" : "Publish"}</Button>: null}

          {postChanged && isEditing && (
            <Button
              onClick={() => {
                saveToDatabase(postInfo);
                setIsEditing(!isEditing);
              }}
              className="bg-green-600"
            >
              Save
            </Button>
          )}
        </div>
      </div>
      {updateResult.type && (
        <Alert
          variant={updateResult.type === "Error" ? "destructive" : "default"}
        >
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>{updateResult.type}</AlertTitle>
          <AlertDescription>{updateResult.message}</AlertDescription>
        </Alert>
      )}
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
