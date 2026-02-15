// Dashboard Statistics — matches API response (snake_case)
export interface DashboardStats {
  total_components: number;
  total_damage_records: number;
  total_predictions: number;
  damage_distribution: DamageDistribution;
  recent_predictions: RecentPrediction[];
  model_accuracy: number | null;
  is_model_trained: boolean;
}

export interface DamageDistribution {
  ringan: number;
  sedang: number;
  berat: number;
  total: number;
}

// Recent prediction — matches API response (snake_case)
export interface RecentPrediction {
  id: string;
  component_id: string;
  component: ComponentInfo | null;
  predicted_level: string;
  confidence: number;
  probabilities: PredictionProbabilities;
  features_used: DamageFeatures;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface ComponentInfo {
  id: string;
  code: string;
  name: string;
  category: string;
  description: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PredictionProbabilities {
  ringan: number;
  sedang: number;
  berat: number;
}

export interface DamageFeatures {
  damage_area: number;
  damage_depth: number;
  damage_point_count: number;
  component_age: number;
  usage_frequency: number;
  corrosion_level: number;
  deformation: number;
}

// Chart Data
export interface ChartData {
  name: string;
  value: number;
  color: string;
}
