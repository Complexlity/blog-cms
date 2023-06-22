import HomePage from "@/components/HomePage";
import { getUser, getPosts } from "@/lib/serverFunctions";



export default async function Home() {
  // const user = await getUser();
  const posts = await getPosts()
  const user = null
  return (
    <div>
      <HomePage user={user} posts={posts} />
    </div>
  );
  // ...
}
