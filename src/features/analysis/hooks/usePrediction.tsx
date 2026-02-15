import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { predictionService } from "../services/prediction.service";
import type {
  PredictionRequest,
  PredictionFilters,
} from "../types/prediction.type";

export const predictionKeys = {
  all: ["predictions"] as const,
  histories: () => [...predictionKeys.all, "history"] as const,
  history: (filters: PredictionFilters) =>
    [...predictionKeys.histories(), filters] as const,
  details: () => [...predictionKeys.all, "detail"] as const,
  detail: (id: string) => [...predictionKeys.details(), id] as const,
  modelStatus: () => [...predictionKeys.all, "model-status"] as const,
};

export const usePredict = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      data,
      saveHistory = true,
    }: {
      data: PredictionRequest;
      saveHistory?: boolean;
    }) => predictionService.predict(data, saveHistory),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: predictionKeys.histories() });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
  });
};

export const usePredictionHistory = (filters: PredictionFilters = {}) => {
  return useQuery({
    queryKey: predictionKeys.history(filters),
    queryFn: () => predictionService.getHistory(filters),
  });
};

export const usePrediction = (id: string) => {
  return useQuery({
    queryKey: predictionKeys.detail(id),
    queryFn: () => predictionService.getById(id),
    enabled: !!id,
  });
};

export const useDeletePrediction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => predictionService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: predictionKeys.histories() });
    },
  });
};

export const useModelStatus = () => {
  return useQuery({
    queryKey: predictionKeys.modelStatus(),
    queryFn: () => predictionService.getModelStatus(),
    staleTime: 1000 * 60 * 5,
  });
};
