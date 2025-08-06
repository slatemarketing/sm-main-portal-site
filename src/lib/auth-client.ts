// lib/auth-client.ts
import { createAuthClient } from "better-auth/react";
import type { Session, User } from "better-auth";

// Extended user type with role
export type AuthUser = User & {
  role: string;
};

// Type definitions for your auth client
export type AuthSession = Session & {
  user: AuthUser;
};

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
});

// Export typed hooks
export const { useSession, signIn, signUp, signOut } = authClient;
