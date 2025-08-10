"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

interface signInProps {
  email: string;
  password: string;
}

interface signUpProps {
  name: string;
  email: string;
  password: string;
}

export async function signIn({ email, password }: signInProps) {
  try {
    await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });
  } catch (error) {
    console.log("ERROR", error);
  }
}

export async function signUp({ name, email, password }: signUpProps) {
  try {
    await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
      },
    });
  } catch (error) {
    console.log("ERROR", error);
  }
}

export async function signOut() {
  try {
    auth.api.signOut({
      headers: await headers(),
    });
  } catch (error) {
    console.log("ERROR", error);
  }
}

export async function getUsers() {
  return await prisma.user.findMany({
    include: {
      profile: true,
    },
  });
}

export async function getUsersNoCompany() {
  return await prisma.user.findMany({
    where: {
      companyId: null,
    },
  });
}

export async function addUserToCompany(userId: string, companyId: string) {
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      companyId: companyId,
    },
  });
}

export async function removeUserFromCompany(userId: string) {
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      companyId: null,
    },
  });
}
