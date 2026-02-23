"use client";

import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

export function ProtectedRoute({ children }: PropsWithChildren) {
  const router = useRouter();

  const { authChecked, isLoading, isLoggedIn, user } = useAuth();

  useEffect(() => {
    if (!authChecked || isLoading) return;

    if (!isLoggedIn) {
      router.replace("/sign-in");
      console.log("ke redirect");
      return;
    }
  }, [authChecked, isLoading, isLoggedIn]);

  if (!authChecked || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (!isLoggedIn) return null;

  return <>{children}</>;
}
