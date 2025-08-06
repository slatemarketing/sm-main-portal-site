import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export async function getSessionWithProfile() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return null;
  }

  const profile = await prisma.profile.findUnique({
    where: {
      userId: session.user.id,
    },
  });

  return {
    ...session,
    user: {
      ...session.user,
      profile,
    },
  };
}

export type SessionWithProfile = NonNullable<Awaited<ReturnType<typeof getSessionWithProfile>>>;