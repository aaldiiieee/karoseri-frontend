import { api } from "@/shared/lib/api/axios";
import type { User, UserCreate, UserUpdate } from "../types/user.type";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const transformUser = (data: any): User => ({
  id: data.id,
  username: data.username,
  role: data.role,
  isActive: data.is_active,
  createdAt: data.created_at,
  updatedAt: data.updated_at,
});

export const userService = {
  getAll: async (): Promise<User[]> => {
    const response = await api.get("/users");
    return response.data.map(transformUser);
  },

  getById: async (id: string): Promise<User> => {
    const response = await api.get(`/users/${id}`);
    return transformUser(response.data);
  },

  create: async (data: UserCreate): Promise<User> => {
    const response = await api.post("/users", {
      username: data.username,
      password: data.password,
      role: data.role,
    });
    return transformUser(response.data);
  },

  update: async (id: string, data: UserUpdate): Promise<User> => {
    const payload: Record<string, unknown> = {};
    if (data.username !== undefined) payload.username = data.username;
    if (data.password !== undefined) payload.password = data.password;
    if (data.role !== undefined) payload.role = data.role;
    if (data.isActive !== undefined) payload.is_active = data.isActive;

    const response = await api.put(`/users/${id}`, payload);
    return transformUser(response.data);
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/users/${id}`);
  },
};
