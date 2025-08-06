"use client";

import { useRouter } from "next/navigation";
import { Button } from "./button";

interface BackButtonProps {
  children?: React.ReactNode;
  className?: string;
}

export function BackButton({ children = "Go Back", className }: BackButtonProps) {
  const router = useRouter();
  
  return (
    <Button onClick={() => router.back()} className={className}>
      {children}
    </Button>
  );
}