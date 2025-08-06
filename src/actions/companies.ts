"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getCompanies() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !("role" in session.user) || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized: Admin access required");
  }
}
