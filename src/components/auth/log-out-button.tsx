"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";

export function LogOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/auth/signin"); // redirect to logsin page
          },
        },
      });
    } catch (error) {
      toast.error("Error!", error || "Unexpected Error! Please try again!");
    }
  }

  return (
    <div>
      <Button variant="default" onClick={handleSignOut}>
        Log Out
      </Button>
    </div>
  );
}
