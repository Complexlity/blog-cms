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

const adminSchema = z.object({
  adminSecretKey: z
    .string({ required_error: "required" }).min(1, "Key cannot be blank").trim()
});

type AdminKeyInput = z.infer<typeof adminSchema>;

export default function AdminForm() {
  const [adminError, setAdminError] = useState(null);
  const router = useRouter();
  const form = useForm<AdminKeyInput>({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      adminSecretKey: ''
    },
  });

  function handleInput() {
    setAdminError(null);
  }
  async function onSubmit(values: AdminKeyInput) {
    const setAdmin = `${SERVER_DOMAIN}/users`;
    try {
      const response = await fetcher(setAdmin, {}, "PATCH", values);
      //@ts-ignore
      if (response && response.status !== 200) {
        //@ts-ignore
        const error = await response.json();
        throw new Error(error.message);
      }
      form.reset();
      router.push("/");
    } catch (error: any) {
      setAdminError(error.message);
    }
  }

  return (
    <>
      {adminError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{adminError}</AlertDescription>
        </Alert>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 mx-auto w-[500px] p-4 rounded-lg shadow-md border-gray- border-2"
        >
          <h1 className="text-3xl font-bold text-center">
            Become An Admin Now!!
          </h1>
          <FormField
            control={form.control}
            name="adminSecretKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Admin Secret Key *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="enter secret key"
                    {...field}
                    onInput={handleInput}
                  />
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
