import { getUser } from "@/lib/serverFunctions";

export default async function Another() {
  "use server";

  const user = await getUser();
  return <div>Hello {user?.name} this is another page</div>;
}
