import { useMutation } from "@tanstack/react-query";
import { loginService } from "../service/sign-in-service";
import { toast } from "sonner";
import { useAuthContext } from "@/context/auth-context";
import { useRouter } from "next/navigation";

export const useLoginMutation = () => {
  const { setAuth } = useAuthContext();
  const router = useRouter();
  return useMutation({
    mutationKey: ["sign-in"],
    mutationFn: loginService,
    onSuccess: (data) => {
      setAuth({ token: data.data.token });
      toast.success("Login Success");
      router.push("/dashboard");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Server Error");
    },
  });
};
