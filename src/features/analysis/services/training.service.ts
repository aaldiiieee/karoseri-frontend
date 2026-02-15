import { api } from "@/shared/lib/api/axios";
import type {
  TrainingRequest,
  TrainingResult,
  ModelMetricsResponse,
  ModelMetricsList,
} from "../types/training.type";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const transformTrainingResult = (data: any): TrainingResult => ({
  success: data.success,
  message: data.message,
  trainingSamples: data.training_samples,
  testSamples: data.test_samples,
  accuracy: data.accuracy,
  precision: data.precision,
  recall: data.recall,
  f1Score: data.f1_score,
  classificationReport: data.classification_report,
  confusionMatrix: data.confusion_matrix,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const transformMetrics = (data: any): ModelMetricsResponse => ({
  id: data.id,
  trainingSamples: data.training_samples,
  accuracy: data.accuracy,
  precision: data.precision,
  recall: data.recall,
  f1Score: data.f1_score,
  classificationReport: data.classification_report,
  confusionMatrix: data.confusion_matrix,
  notes: data.notes,
  createdAt: data.created_at,
  updatedAt: data.updated_at,
});

export const trainingService = {
  train: async (data: TrainingRequest = {}): Promise<TrainingResult> => {
    const payload: Record<string, unknown> = {};
    if (data.testSize !== undefined) payload.test_size = data.testSize;
    if (data.notes !== undefined) payload.notes = data.notes;

    const response = await api.post("/predictions/train", payload);
    return transformTrainingResult(response.data);
  },

  getMetrics: async (
    page = 1,
    size = 10
  ): Promise<ModelMetricsList> => {
    const response = await api.get(
      `/predictions/metrics?page=${page}&size=${size}`
    );
    return {
      items: response.data.items.map(transformMetrics),
      total: response.data.total,
    };
  },

  getLatestMetrics: async (): Promise<ModelMetricsResponse> => {
    const response = await api.get("/predictions/metrics/latest");
    return transformMetrics(response.data);
  },

  getModelInfo: async (): Promise<Record<string, unknown>> => {
    const response = await api.get("/predictions/model-info");
    return response.data;
  },
};
