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
import fetcher from "@/lib/fetcher";

const SERVER_DOMAIN = process.env.NEXT_PUBLIC_SERVER_DOMAIN as unknown as URL;

const logInSchema = z.object({
  email: z
    .string({ required_error: "required" })
    .email("Invalid email address"),
  password: z.string({ required_error: "required" }).min(8, "Too short"),
});

type CreateSessionInput = z.infer<typeof logInSchema>;

export default function LoginForm() {
  const [loginError, setLoginError] = useState(null);
  const router = useRouter();
  const form = useForm<CreateSessionInput>({
    resolver: zodResolver(logInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function handleInput() {
    setLoginError(null);
  }
  async function onSubmit(values: CreateSessionInput) {
    const loginUser = `${SERVER_DOMAIN}/sessions`;
    try {
      const response = await fetcher(loginUser, {}, "POST", values);
      //@ts-ignore
      if (response && response.status !== 200) {
        //@ts-ignore
        const error = await response.json();
        throw new Error(error.message);
      }
      form.reset();
      router.push("/");
    } catch (error: any) {
      setLoginError(error.message);
    }
  }

  return (
    <>
      {loginError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{loginError}</AlertDescription>
        </Alert>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 mx-auto w-[500px] p-4 rounded-lg shadow-md border-gray- border-2"
        >
          <h1 className="text-3xl font-bold text-center">Log In Now</h1>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="your email"
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="enter your password"
                    {...field}
                    onInput={handleInput}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
          <p>
            Don't have an account?{" "}
            <Link href={"/signup"}>
              <span className="italic text-primary hover:underline text-purple-800 font-bold text-lg">
                Sign Up
              </span>
            </Link>{" "}
          </p>
        </form>
      </Form>
    </>
  );
}
