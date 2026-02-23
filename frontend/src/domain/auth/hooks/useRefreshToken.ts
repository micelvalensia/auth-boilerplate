import { useAuthContext } from "@/context/auth-context";
import { useMutation } from "@tanstack/react-query";
import { refreshService } from "../service/sign-in-service";

export const useRefreshMutation = () => {
  const { setAuth, clearAuth } = useAuthContext();

  return useMutation({
    mutationFn: refreshService,
    onSuccess: (authData) => {
      setAuth({
        token: authData.data.token,
      });
    },
    onError: () => {
      clearAuth();
    },
  });
};
