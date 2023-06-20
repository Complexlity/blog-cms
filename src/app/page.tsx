'use client'

import fetcher from "@/utils/fetching"
import { headers, cookies } from 'next/headers'
import { useEffect, useState } from "react";
import useSwr from 'swr'
// async function getUser({Headers}: {Headers: any}) {


//   const data = await fetch(url, {
//     headers: {
//       Headers
//     },
//     credentials: 'include'
//   })
//   //@ts-ignore
//   return data | "no-data"
// }

export default function Home() {
  const [data, setData] = useState()
  const url = `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/v1/me`;
  useEffect(() => {
    const fetchData = async () => {
      const response = fetcher(url)
      const data = await response.json()
      setData(data)
    }
    fetchData()

  }, [])
  console.log({data})
  // const { data } = useSwr(url, fetcher);
  // if (data) {
  //   return <p>Welcome {JSON.stringify(data)}</p>;
  // }
  return <p>Hello world from {data}</p>;
}