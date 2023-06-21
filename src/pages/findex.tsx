"use client";

import type { GetServerSideProps, NextPage } from "next";

import fetcher from "../lib/fetching";
import HomePage from "@/components/HomePage";
import { User } from "@/lib/types";

const Home: NextPage<{ fallbackData: User | null }> = ({ fallbackData }) => {
  return (
    <div>
      Welcome {JSON.stringify(fallbackData!, null, 2)}
      <HomePage />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await fetcher(`${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/me`, {
    ...context.req.headers,
  });
  if (!data)
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };

  return { props: { fallbackData: data } };
};

export default Home;
