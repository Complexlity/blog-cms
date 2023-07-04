"use client";

import Link from "next/link";


export default function HomePage() {

  return (
    <>
      <p>Hello world</p>
      <p>Welcome to the world class cms</p>
      <ul>
        <Link href="/posts">Posts</Link>
        <Link href="/create">Create</Link>
        <Link href="/admin">Admin</Link>
      </ul>
    </>

  );
}
