import { useQuery } from "@tanstack/react-query";
import { getMeService } from "../service/sign-in-service";

export const useMeQuery = (enabled: boolean) => {
  return useQuery({
    queryKey: ["me"],
    queryFn: getMeService,
    enabled,
    staleTime: Infinity,
    retry: false,
  });
};
