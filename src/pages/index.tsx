'use client'

import type { GetServerSideProps, NextPage } from "next";
import useSwr from "swr";
import fetcher from "../utils/fetching";
import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import LoginForm from "@/components/LoginForm";

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

const Home: NextPage<{ fallbackData: User | null }> = ({ fallbackData }) => {
  const router = useRouter()
  useEffect(() => {
    if (fallbackData === null) router.push('/login')
  }, [router])

  if(fallbackData)
  return (
    <div>Welcome {fallbackData.name}</div>
    )
  else return (<div></div>)

};

export const getServerSideProps: GetServerSideProps = async (context) => {

  const data = await fetcher(
    `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/v1/me`, {
      ...context.req.headers,
    }
  );
  return { props: { fallbackData: data } };
};

export default Home;
