"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { db } from "@/db";
import { clinicsTable, userToClinicTable } from "@/db/schema";
import { auth } from "@/lib/auth";

export async function createClinic(data: { name: string }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  //only logged in users can create clinics
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  //create the clinic
  const [clinic] = await db.insert(clinicsTable).values({ name: data.name }).returning();
  //create the clinic
  await db.insert(userToClinicTable).values({
    userId: session.user.id,
    clinicId: clinic.id,
  });
  redirect("/dashboard");
}
