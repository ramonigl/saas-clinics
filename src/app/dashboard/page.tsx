import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { userToClinicTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import SignOutButton from "./components/sign-out-button";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    redirect("/authentication");
  }

  //need to get the clinics for the user
  const clinics = await db.query.userToClinicTable.findMany({
    where: eq(userToClinicTable.userId, session.user.id), //picks the user id from the session and gets the clinics for that user
  });
  if (clinics.length === 0) {
    redirect("/clinic-form");
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p><strong>Nome:</strong> {session?.user?.name}</p>
      <p><strong>Email:</strong> {session?.user?.email}</p>
      <p><strong>ID:</strong> {session?.user?.id}</p>
      <p><strong>Criado em:</strong> {session?.user?.createdAt?.toISOString()}</p>
      <p><strong>Atualizado em:</strong> {session?.user?.updatedAt?.toISOString()}</p>
      <p><strong>Email verificado:</strong> {session?.user?.emailVerified ? "true" : "false"}</p>
      <p><strong>Clínicas:</strong></p>
      <SignOutButton />
    </div>
  );
};

export default DashboardPage;
