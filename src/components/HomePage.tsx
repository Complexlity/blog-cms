"use client";

import { Post, User } from "@/lib/types";
import { useRouter } from "next/navigation";
import Card from "./ui/card";

export default function HomePage({ user, posts }: { user: User | null, posts: Post[] }) {
  const router = useRouter();
  async function logout() {
    const url = `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/sessions`;
   try {

     await fetch(url, {
       method: "DELETE",
       credentials: "include",
     });
    } catch (error) {
      console.log(error)

   } finally {
      router.push("/login");
    }
  }

  return (
    <>
      <nav>
        <ul>
          <li>Home</li>
          <li>Hello {user ? user.name : ''} welcome to the club</li>
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        </ul>
      </nav>
      {
        posts.map((post) => {
          return <Card key={post._id} post={post} />;
       })
      }
    </>
  );
}
