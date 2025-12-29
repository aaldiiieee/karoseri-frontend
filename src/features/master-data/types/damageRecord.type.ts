export type DamageLevel = "ringan" | "sedang" | "berat";

export interface DamageRecord {
  id: string;
  componentId: string;
  component?: {
    id: string;
    code: string;
    name: string;
    category: string;
  };
  damageArea: number;
  damageDepth: number;
  damagePointCount: number;
  componentAge: number;
  usageFrequency: number;
  corrosionLevel: number;
  deformation: number;
  damageLevel: DamageLevel;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface DamageRecordCreate {
  componentId: string;
  damageArea: number;
  damageDepth: number;
  damagePointCount: number;
  componentAge: number;
  usageFrequency: number;
  corrosionLevel: number;
  deformation: number;
  damageLevel: DamageLevel;
  notes?: string;
}

export interface DamageRecordUpdate extends Partial<DamageRecordCreate> {}

export interface DamageRecordList {
  items: DamageRecord[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

export interface DamageRecordFilters {
  page?: number;
  size?: number;
  componentId?: string;
  damageLevel?: DamageLevel;
}

export interface ActionHandlers {
  onEdit: (item: DamageRecord) => void;
  onDelete: (item: DamageRecord) => void;
}
