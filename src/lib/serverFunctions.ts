import "server-only";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Post, User } from "@/lib/types";


function getHeaders() {
  const Headers = headers();
  const authorization = Headers.get("authorization");
  const cookie = Headers.get("cookie");
  return { authorization, cookie}
}

export async function getUser(): Promise<User> {
  const headers = getHeaders();
  // Forward the authorization header
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/me`, {
      //@ts-ignore
      headers,
    });
    if (!res.ok) throw new Error("User not found");
    return res.json() as unknown as User;
  } catch (error) {
    return redirect("/login");
  }
}

export async function getPosts(): Promise<Post[]> {
  const headers = getHeaders()
  // Forward the authorization header
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/posts`, {
      //@ts-ignore
      headers,
    });
    if (!res.ok) return []
    return res.json() ;
  } catch (error) {
    return []
  }
}
