"use client";

import { useAuthContext } from "@/context/auth-context";
import { useRefreshMutation } from "./useRefreshToken";
import { useMeQuery } from "./useMeQuery";
import { useEffect } from "react";
import { logoutService } from "../service/sign-in-service";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useAuth = () => {
  const { clearAuth, token } = useAuthContext();
  const router = useRouter();

  const refreshMutation = useRefreshMutation();

  const getMe = useMeQuery(!!token);

  useEffect(() => {
    if (!token) {
      refreshMutation.mutate();
    }
  }, []);

  const logout = async () => {
    await logoutService();
    clearAuth();
    toast.success("Logout Success");
    router.push("/sign-in");
  };

  const authChecked =
    !refreshMutation.isPending &&
    (getMe.isSuccess || getMe.isError || (!token && refreshMutation.isError));

  return {
    user: getMe.data?.user ?? null,
    isLoggedIn: !!getMe.data,
    isLoading: getMe.isLoading || refreshMutation.isPending,
    // mustChangePassword: getMe.data?.mustChangePassword ?? false,
    authChecked: authChecked,
    logout,
  };
};
