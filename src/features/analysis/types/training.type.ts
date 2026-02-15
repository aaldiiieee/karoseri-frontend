// Training request
export interface TrainingRequest {
  testSize?: number;
  notes?: string;
}

// Training result
export interface TrainingResult {
  success: boolean;
  message: string;
  trainingSamples: number;
  testSamples: number;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  classificationReport: Record<string, unknown>;
  confusionMatrix: number[][];
}

// Model metrics response
export interface ModelMetricsResponse {
  id: string;
  trainingSamples: number;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  classificationReport: Record<string, unknown>;
  confusionMatrix: number[][];
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

// Model metrics list
export interface ModelMetricsList {
  items: ModelMetricsResponse[];
  total: number;
}
