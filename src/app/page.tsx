import HomePage from "@/components/HomePage";
import { getPosts, getUser } from "@/lib/serverFunctions";



export default async function Home() {
  const posts = await getPosts()
  return (
    <div>
      <HomePage />
    </div>
  );
  // ...
}
