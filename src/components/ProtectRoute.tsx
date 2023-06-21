import { getUser } from "@/lib/serverFunctions";
import { User } from "@/lib/types";

export default async function ProtectRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  return <Father user={user}>{children}</Father>;
}

function Father({ user, children }: { user: User; children: React.ReactNode }) {
  return <>{children}</>;
}
