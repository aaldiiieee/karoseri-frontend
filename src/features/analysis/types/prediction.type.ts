export type DamageLevel = "ringan" | "sedang" | "berat";

// Request to predict damage level
export interface PredictionRequest {
  componentId: string;
  damageArea: number;
  damageDepth: number;
  damagePointCount: number;
  componentAge: number;
  usageFrequency: number;
  corrosionLevel: number;
  deformation: number;
  notes?: string;
}

// Probabilities per class
export interface PredictionProbabilities {
  ringan: number;
  sedang: number;
  berat: number;
}

// Features used in prediction
export interface DamageFeatures {
  damageArea: number;
  damageDepth: number;
  damagePointCount: number;
  componentAge: number;
  usageFrequency: number;
  corrosionLevel: number;
  deformation: number;
}

// Prediction result (returned after /predict)
export interface PredictionResult {
  predictedLevel: string;
  confidence: number;
  probabilities: PredictionProbabilities;
  featuresUsed: DamageFeatures;
}

// Component info embedded in prediction response
export interface PredictionComponent {
  id: string;
  code: string;
  name: string;
  category: string;
  description: string | null;
  isActive: boolean;
}

// Single prediction response (from history)
export interface PredictionResponse extends PredictionResult {
  id: string;
  componentId: string;
  component: PredictionComponent | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

// Paginated prediction history
export interface PredictionHistoryList {
  items: PredictionResponse[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

// Filters for prediction history
export interface PredictionFilters {
  page?: number;
  size?: number;
  componentId?: string;
  predictedLevel?: DamageLevel;
}

// Model status
export interface ModelStatus {
  isTrained: boolean;
  trainingSamples: number | null;
  lastTrainedAt: string | null;
  accuracy: number | null;
}

// Action handlers for data table
export interface PredictionActionHandlers {
  onView: (item: PredictionResponse) => void;
  onDelete: (item: PredictionResponse) => void;
}
