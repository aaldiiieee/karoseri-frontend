import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { karoseriComponentService } from "../services/karoseriComponent.service";
import type {
  ComponentCreate,
  ComponentUpdate,
  ComponentFilters,
} from "../types/karoseriComponent.type";

export const componentKeys = {
  all: ["components"] as const,
  lists: () => [...componentKeys.all, "list"] as const,
  list: (filters: ComponentFilters) =>
    [...componentKeys.lists(), filters] as const,
  details: () => [...componentKeys.all, "detail"] as const,
  detail: (id: string) => [...componentKeys.details(), id] as const,
  categories: () => [...componentKeys.all, "categories"] as const,
};

export const useComponents = (filters: ComponentFilters = {}) => {
  return useQuery({
    queryKey: componentKeys.list(filters),
    queryFn: () => karoseriComponentService.getAll(filters),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

export const useComponent = (id: string) => {
  return useQuery({
    queryKey: componentKeys.detail(id),
    queryFn: () => karoseriComponentService.getById(id),
    enabled: !!id,
  });
};

export const useComponentCategories = () => {
  return useQuery({
    queryKey: componentKeys.categories(),
    queryFn: karoseriComponentService.getCategories,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

export const useCreateComponent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ComponentCreate) =>
      karoseriComponentService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: componentKeys.lists() });
      queryClient.invalidateQueries({ queryKey: componentKeys.categories() });
    },
  });
};

export const useUpdateComponent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ComponentUpdate }) =>
      karoseriComponentService.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: componentKeys.lists() });
      queryClient.invalidateQueries({ queryKey: componentKeys.detail(id) });
    },
  });
};

export const useDeleteComponent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => karoseriComponentService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: componentKeys.lists() });
    },
  });
};

export const useBulkImportComponent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => karoseriComponentService.bulkImport(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: componentKeys.lists() });
      queryClient.invalidateQueries({ queryKey: componentKeys.categories() });
    },
  });
};
