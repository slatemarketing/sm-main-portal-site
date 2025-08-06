"use client";

import { useSession } from "@/lib/auth-client";
import { useEffect, useState, useCallback } from "react";

interface Profile {
  id: string;
  userId: string;
  firstName?: string | null;
  lastName?: string | null;
  company?: string | null;
  phone?: string | null;
  bio?: string | null;
  avatar?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface SessionWithProfile {
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image?: string | null;
    role?: string;
    profile?: Profile | null;
  };
}

export function useSessionWithProfile() {
  const { data: session, isPending } = useSession();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(false);
  const [hasLoadedProfile, setHasLoadedProfile] = useState(false);

  const fetchProfile = useCallback(
    async (userId: string) => {
      if (hasLoadedProfile) return;

      setIsLoadingProfile(true);
      try {
        const response = await fetch(`/api/profile/${userId}`);
        const data = await response.json();
        setProfile(data.profile);
        setHasLoadedProfile(true);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setIsLoadingProfile(false);
      }
    },
    [hasLoadedProfile]
  );

  useEffect(() => {
    if (session?.user?.id && !hasLoadedProfile) {
      fetchProfile(session.user.id);
    }
  }, [session?.user?.id, hasLoadedProfile, fetchProfile]);

  // Reset profile state when session changes
  useEffect(() => {
    if (!session?.user?.id) {
      setProfile(null);
      setHasLoadedProfile(false);
      setIsLoadingProfile(false);
    }
  }, [session?.user?.id]);

  return {
    data: session
      ? ({
          ...session,
          user: {
            ...session.user,
            profile,
          },
        } as SessionWithProfile)
      : null,
    isPending: isPending || isLoadingProfile,
    profile,
  };
}
