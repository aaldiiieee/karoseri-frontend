import { api } from "@/shared/lib/api/axios";
import type {
  PredictionRequest,
  PredictionResult,
  PredictionResponse,
  PredictionHistoryList,
  PredictionFilters,
  ModelStatus,
} from "../types/prediction.type";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const transformPredictionResult = (data: any): PredictionResult => ({
  predictedLevel: data.predicted_level,
  confidence: data.confidence,
  probabilities: data.probabilities,
  featuresUsed: {
    damageArea: data.features_used.damage_area,
    damageDepth: data.features_used.damage_depth,
    damagePointCount: data.features_used.damage_point_count,
    componentAge: data.features_used.component_age,
    usageFrequency: data.features_used.usage_frequency,
    corrosionLevel: data.features_used.corrosion_level,
    deformation: data.features_used.deformation,
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const transformPredictionResponse = (data: any): PredictionResponse => ({
  ...transformPredictionResult(data),
  id: data.id,
  componentId: data.component_id,
  component: data.component
    ? {
      id: data.component.id,
      code: data.component.code,
      name: data.component.name,
      category: data.component.category,
      description: data.component.description,
      isActive: data.component.is_active,
    }
    : null,
  notes: data.notes,
  createdAt: data.created_at,
  updatedAt: data.updated_at,
});

const toSnakeCase = (data: PredictionRequest) => ({
  component_id: data.componentId,
  damage_area: data.damageArea,
  damage_depth: data.damageDepth,
  damage_point_count: data.damagePointCount,
  component_age: data.componentAge,
  usage_frequency: data.usageFrequency,
  corrosion_level: data.corrosionLevel,
  deformation: data.deformation,
  notes: data.notes,
});

export const predictionService = {
  predict: async (
    data: PredictionRequest,
    saveHistory = true
  ): Promise<PredictionResult> => {
    const response = await api.post(
      `/predictions/predict?save_history=${saveHistory}`,
      toSnakeCase(data)
    );
    return transformPredictionResult(response.data);
  },

  getHistory: async (
    filters: PredictionFilters = {}
  ): Promise<PredictionHistoryList> => {
    const params = new URLSearchParams();
    if (filters.page) params.append("page", String(filters.page));
    if (filters.size) params.append("size", String(filters.size));
    if (filters.componentId)
      params.append("component_id", filters.componentId);
    if (filters.predictedLevel)
      params.append("predicted_level", filters.predictedLevel);

    const response = await api.get(
      `/predictions/history?${params.toString()}`
    );
    return {
      items: response.data.items.map(transformPredictionResponse),
      total: response.data.total,
      page: response.data.page,
      size: response.data.size,
      pages: response.data.pages,
    };
  },

  getById: async (id: string): Promise<PredictionResponse> => {
    const response = await api.get(`/predictions/history/${id}`);
    return transformPredictionResponse(response.data);
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/predictions/history/${id}`);
  },

  getModelStatus: async (): Promise<ModelStatus> => {
    const response = await api.get("/predictions/model-status");
    return {
      isTrained: response.data.is_trained,
      trainingSamples: response.data.training_samples,
      lastTrainedAt: response.data.last_trained_at,
      accuracy: response.data.accuracy,
    };
  },
};
