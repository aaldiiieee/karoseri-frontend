import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { trainingService } from "../services/training.service";
import type { TrainingRequest } from "../types/training.type";
import { predictionKeys } from "./usePrediction";

export const trainingKeys = {
  all: ["training"] as const,
  metrics: () => [...trainingKeys.all, "metrics"] as const,
  latest: () => [...trainingKeys.all, "latest"] as const,
};

export const useTrainModel = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TrainingRequest = {}) => trainingService.train(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: trainingKeys.metrics() });
      queryClient.invalidateQueries({ queryKey: trainingKeys.latest() });
      queryClient.invalidateQueries({
        queryKey: predictionKeys.modelStatus(),
      });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
  });
};

export const useModelMetrics = (page = 1, size = 10) => {
  return useQuery({
    queryKey: [...trainingKeys.metrics(), page, size],
    queryFn: () => trainingService.getMetrics(page, size),
  });
};

export const useLatestMetrics = () => {
  return useQuery({
    queryKey: trainingKeys.latest(),
    queryFn: () => trainingService.getLatestMetrics(),
    retry: false,
  });
};
