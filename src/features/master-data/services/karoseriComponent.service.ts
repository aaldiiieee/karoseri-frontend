import { api } from "@/shared/lib/api/axios";
import type {
  Component,
  ComponentCreate,
  ComponentUpdate,
  ComponentList,
  ComponentFilters,
} from "../types/karoseriComponent.types";

// Response transformer
const transformComponent = (data: any): Component => ({
  id: data.id,
  componentCode: data.code,
  componentName: data.name,
  category: data.category,
  description: data.description,
  isActive: data.is_active,
  createdAt: data.created_at,
  updatedAt: data.updated_at,
});

const transformComponentList = (data: any): ComponentList => ({
  items: data.items.map(transformComponent),
  total: data.total,
  page: data.page,
  size: data.size,
  pages: data.pages,
});

// Request transformer
const toSnakeCase = (data: ComponentCreate | ComponentUpdate) => ({
  code: data.componentCode,
  name: data.componentName,
  category: data.category,
  description: data.description,
  is_active: data.isActive,
});

export const karoseriComponentService = {
  getAll: async (filters: ComponentFilters = {}): Promise<ComponentList> => {
    const params = new URLSearchParams();
    if (filters.page) params.append("page", String(filters.page));
    if (filters.size) params.append("size", String(filters.size));
    if (filters.category) params.append("category", filters.category);
    if (filters.isActive !== undefined)
      params.append("is_active", String(filters.isActive));
    if (filters.search) params.append("search", filters.search);

    const response = await api.get(`/components?${params.toString()}`);
    return transformComponentList(response.data);
  },

  getById: async (id: string): Promise<Component> => {
    const response = await api.get(`/components/${id}`);
    return transformComponent(response.data);
  },

  getCategories: async (): Promise<string[]> => {
    const response = await api.get("/components/categories");
    return response.data;
  },

  create: async (data: ComponentCreate): Promise<Component> => {
    const response = await api.post("/components", toSnakeCase(data));
    return transformComponent(response.data);
  },

  update: async (id: string, data: ComponentUpdate): Promise<Component> => {
    const response = await api.put(`/components/${id}`, toSnakeCase(data));
    return transformComponent(response.data);
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/components/${id}`);
  },
};
