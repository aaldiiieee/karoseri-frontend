import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { damageRecordService } from "../services/damageRecord.service";
import type {
  DamageRecordCreate,
  DamageRecordUpdate,
  DamageRecordFilters,
} from "../types/damageRecord.type";

export const damageRecordKeys = {
  all: ["damageRecords"] as const,
  lists: () => [...damageRecordKeys.all, "list"] as const,
  list: (filters: DamageRecordFilters) =>
    [...damageRecordKeys.lists(), filters] as const,
  details: () => [...damageRecordKeys.all, "detail"] as const,
  detail: (id: string) => [...damageRecordKeys.details(), id] as const,
};

export const useDamageRecords = (filters: DamageRecordFilters = {}) => {
  return useQuery({
    queryKey: damageRecordKeys.list(filters),
    queryFn: () => damageRecordService.getAll(filters),
  });
};

export const useDamageRecord = (id: string) => {
  return useQuery({
    queryKey: damageRecordKeys.detail(id),
    queryFn: () => damageRecordService.getById(id),
    enabled: !!id,
  });
};

export const useCreateDamageRecord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DamageRecordCreate) => damageRecordService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: damageRecordKeys.lists() });
    },
  });
};

export const useUpdateDamageRecord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: DamageRecordUpdate }) =>
      damageRecordService.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: damageRecordKeys.lists() });
      queryClient.invalidateQueries({ queryKey: damageRecordKeys.detail(id) });
    },
  });
};

export const useDeleteDamageRecord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => damageRecordService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: damageRecordKeys.lists() });
    },
  });
};

export const useBulkImportDamageRecord = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => damageRecordService.bulkImport(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: damageRecordKeys.lists() });
    },
  });
};
