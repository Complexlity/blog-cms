"use client";

import { Post, User } from "@/lib/types";
import { useRouter } from "next/navigation";
import Card from "./ui/card";

export default function HomePage({ user, posts }: { user: User, posts: Post[] }) {
  const router = useRouter();
  async function logout() {
    const url = `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/sessions`;
    await fetch(url, {
      method: "DELETE",
      credentials: "include",
    });
    router.push("/login");
  }

  return (
    <>
      <nav>
        <ul>
          <li>Home</li>
          <li>Hello {user.name} welcome to the club</li>
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
