"use client";

import type { GetServerSideProps, NextPage } from "next";
import useSwr from "swr";
import fetcher from 
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface User {
  _id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  session: string;
  iat: number;
  exp: number;
}

const Home: NextPage<{ fallbackData: User }> = ({ fallbackData }) => {
  const router = useRouter();
  const url = `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/v1/me`;
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url, {
        credentials: "include",
      });
      const result = await response.json();
      return result
    };
    const data = fetchData();
    if (!data) router.push('/login')
    else(setUser(data))

  }, []);

  return <div>Welcome {JSON.stringify(user)}</div>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await fetcher(
    `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/v1/me`,
    {
      ...context.req.headers,
    }
  );
  return { props: { fallbackData: data } };
};

export default Home;
