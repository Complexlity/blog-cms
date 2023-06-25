import { getUser } from "@/lib/serverFunctions";

export default async function Another() {
  const user = await getUser();
  return <div>Hello {user?.name} this is another page</div>;
}
