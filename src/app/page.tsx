import { redirect } from "next/navigation";
import {headers} from 'next/headers'
import HomePage from "@/components/HomePage";

async function getUser() {
   const Headers = headers();
  const authorization = Headers.get("authorization");
  const cookie = Headers.get('cookie')

   // Forward the authorization header
   const res = await fetch(
     `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/v1/me`,
     {
       //@ts-ignore
       headers: { authorization, cookie },
     }
  );
  if(!res.ok) return null
   return res.json();
}

export default async function Home() {
  const team = await getUser();
  if (!team) {
    redirect("/login");

  }

  return (
    <div>
      Welcome {JSON.stringify(team!, null, 2)}
      <HomePage />
    </div>
  );
  // ...
}
