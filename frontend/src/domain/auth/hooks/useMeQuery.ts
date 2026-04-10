import { useQuery } from "@tanstack/react-query";
import { getMeService } from "../service/sign-in-service";

type MeData = {
  data: {
    username: string;
    email: string;
    created_at: string;
  };
};

export const useMeQuery = (enabled: boolean) => {
  return useQuery<MeData>({
    queryKey: ["me"],
    queryFn: getMeService,
    enabled,
    staleTime: Infinity,
    retry: false,
  });
};
