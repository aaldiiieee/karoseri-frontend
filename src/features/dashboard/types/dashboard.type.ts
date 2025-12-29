// Dashboard Statistics
export interface DashboardStats {
  total_components: number;
  total_damage_records: number;
  total_predictions: number;
  damage_distribution: DamageDistribution;
  recent_predictions: PredictionHistory[];
  model_accuracy: number | null;
  is_model_trained: boolean;
}

export interface DamageDistribution {
  ringan: number;
  sedang: number;
  berat: number;
  total: number;
}

export interface PredictionHistory {
  id: string;
  componentId: string;
  component: ComponentInfo | null;
  predictedLevel: DamageLevel;
  confidence: number;
  probabilities: PredictionProbabilities;
  damageArea: number;
  damageDepth: number;
  damagePointCount: number;
  componentAge: number;
  usageFrequency: number;
  corrosionLevel: number;
  deformation: number;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ComponentInfo {
  id: string;
  componentCode: string;
  componentName: string;
  category: string;
  description: string | null;
  isActive: boolean;
}

export interface PredictionProbabilities {
  ringan: number;
  sedang: number;
  berat: number;
}

export type DamageLevel = "Ringan" | "Sedang" | "Berat";

// Chart Data
export interface ChartData {
  name: string;
  value: number;
  color: string;
}
