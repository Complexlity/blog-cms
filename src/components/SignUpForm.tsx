"use client";

import { useState } from 'react'
import { useRouter } from 'next/navigation';
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
import { AlertCircle, FileWarning, Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


const SERVER_DOMAIN = process.env.NEXT_PUBLIC_SERVER_DOMAIN as unknown as URL

const signUpSchema = z
  .object({
    name: z
      .string({ required_error: "required" })
      .min(2, "Too short")
      .max(40, "Too long"),
    email: z
      .string({ required_error: "required" })
      .email("Invalid email address"),
    password: z
      .string({ required_error: "required" })
      .min(8, "Too short"),
    passwordConfirmation: z.string({
      required_error: "Password Confirmation is required",
    }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"],
  });

type SignUpInput = z.infer<typeof signUpSchema>;

export default function SignUpForm() {
  const router = useRouter()
  const [registerError, setRegisterError] = useState("Bad things have happened")
  const form = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  async function onSubmit(values: SignUpInput) {
    const createUser = `${SERVER_DOMAIN}/api/v1/users`
    try {
      const response = await fetch(createUser, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
        },
    body: JSON.stringify(values)
      })
      if (response.status !== 200) {
        const error = await response.json()
        form.setError("email", {
          type:"custom", message: error.message
        })
        //@ts-ignore
        throw new Error(error.message);
      }
    form.reset();
      router.push('/')

    }
    catch (error: any) {
    }



}


  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 mx-auto w-[500px] p-4 rounded-lg shadow-md border-gray- border-2"
        >
          <h1 className="text-3xl font-bold text-center">Sign Up Now</h1>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username *</FormLabel>
                <FormControl>
                  <Input placeholder="display name" {...field} />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input placeholder="cool email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password *</FormLabel>
                <FormControl>
                  <Input  placeholder="enter a strong password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordConfirmation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password *</FormLabel>
                <FormControl>
                  <Input  placeholder="re-enter password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
}
