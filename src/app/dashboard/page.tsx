import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

import SignOutButton from "./components/sign-out-button";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    redirect("/authentication");
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <p>{session?.user?.name}</p>
      <p>{session?.user?.email}</p>
      <p>{session?.user?.id}</p>
      <p>{session?.user?.image}</p>
      <p>{session?.user?.createdAt?.toISOString()}</p>
      <p>{session?.user?.updatedAt?.toISOString()}</p>
      <p>{session?.user?.emailVerified ? "true" : "false"}</p>
      <SignOutButton />
    </div>
  );
};

export default DashboardPage;
