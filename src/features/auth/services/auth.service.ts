import { api } from "@/shared/lib/api";
import type { LoginRequest, LoginResponse, User } from "../types/auth.type";

export const authService = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post("/auth/login", data);
    return response.data;
  },

  getMe: async (): Promise<User> => {
    const response = await api.get("/users/me");
    return response.data;
  },
};
