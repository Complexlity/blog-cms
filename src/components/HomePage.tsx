'use client'


import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  async function logout() {
    const url = `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/api/v1/sessions`;
    await fetch(url, {
      method: "DELETE",
      credentials: "include",
    })
    router.push('/login')
  }


  return (
    <nav>
      <ul>
        <li>Home</li>
        <li><button onClick={() => {
          logout()
        }}>Logout</button></li>
        <li></li>
        <li></li>
      </ul>
    </nav>
  )
}