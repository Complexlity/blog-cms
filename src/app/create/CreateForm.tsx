"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useMutation } from "react-query";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";


const SERVER_DOMAIN = process.env.NEXT_PUBLIC_SERVER_DOMAIN as unknown as URL;

const postSchema = z.object({
    title: z
      .string({
        required_error: "Post title cannot be empty",
      })
      .min(1)
      .max(100, "Title must be at most 100 characters"),
    content: z
      .string({
        required_error: "Post content cannot be empty",
      })
      .min(1)
      .max(1000, "Content must be at most 1000 characters"),
  })


type CreatePostInput = z.infer<typeof postSchema>;

export default function CreateForm() {
  const [createError, setCreateError] = useState(null);
  const router = useRouter();
  const form = useForm<CreatePostInput>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  function handleInput() {
    setCreateError(null);
  }

  const url = `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/posts/`;
  const { mutate} = useMutation({
    mutationFn: async (values: CreatePostInput) => {
      return createPost(values)
  },
    onError: (error: any) => {
      return setCreateError(error.message)
    },
    onSuccess: () => {
      form.reset()
      router.push('/posts')
    }
  })


  const createPost = async (values: CreatePostInput) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(values),
    });
    const data = await response.json();

    if (!response.ok) {
      if (response.status == 403) {
        throw new Error("You need to Login to Create")
      }
    }
    // form.reset();
    // return data;
  }

  return (
    <>
      {createError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{createError}</AlertDescription>
        </Alert>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(mutate)}
          className="space-y-4 mx-auto w-[500px] p-4 rounded-lg shadow-md border-gray- border-2"
        >
          <h1 className="text-3xl font-bold text-center">Create New Post</h1>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Post Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="your post title"
                    {...field}
                    onInput={handleInput}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Post Content</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter post content"
                    {...field}
                    onInput={handleInput}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Create</Button>

        </form>
      </Form>
    </>
  );
}
