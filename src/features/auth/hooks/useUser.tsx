import { useQuery } from "@tanstack/react-query";
import { authService } from "../services/auth.service";

export const useUser = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => authService.getMe(),
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
