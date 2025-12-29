import { api } from "@/shared/lib/api/axios";
import type {
  DamageRecord,
  DamageRecordCreate,
  DamageRecordUpdate,
  DamageRecordList,
  DamageRecordFilters,
} from "../types/damageRecord.type";

// Response transformer
const transformDamageRecord = (data: any): DamageRecord => ({
  id: data.id,
  componentId: data.component_id,
  component: data.component
    ? {
        id: data.component.id,
        code: data.component.code,
        name: data.component.name,
        category: data.component.category,
      }
    : undefined,
  damageArea: data.damage_area,
  damageDepth: data.damage_depth,
  damagePointCount: data.damage_point_count,
  componentAge: data.component_age,
  usageFrequency: data.usage_frequency,
  corrosionLevel: data.corrosion_level,
  deformation: data.deformation,
  damageLevel: data.damage_level,
  notes: data.notes,
  createdAt: data.created_at,
  updatedAt: data.updated_at,
});

const transformDamageRecordList = (data: any): DamageRecordList => ({
  items: data.items.map(transformDamageRecord),
  total: data.total,
  page: data.page,
  size: data.size,
  pages: data.pages,
});

// Request transformer
const toSnakeCase = (data: DamageRecordCreate | DamageRecordUpdate) => ({
  component_id: data.componentId,
  damage_area: data.damageArea,
  damage_depth: data.damageDepth,
  damage_point_count: data.damagePointCount,
  component_age: data.componentAge,
  usage_frequency: data.usageFrequency,
  corrosion_level: data.corrosionLevel,
  deformation: data.deformation,
  damage_level: data.damageLevel,
  notes: data.notes,
});

export const damageRecordService = {
  getAll: async (
    filters: DamageRecordFilters = {}
  ): Promise<DamageRecordList> => {
    const params = new URLSearchParams();
    if (filters.page) params.append("page", String(filters.page));
    if (filters.size) params.append("size", String(filters.size));
    if (filters.componentId) params.append("component_id", filters.componentId);
    if (filters.damageLevel) params.append("damage_level", filters.damageLevel);

    const response = await api.get(`/damage-records?${params.toString()}`);
    return transformDamageRecordList(response.data);
  },

  getById: async (id: string): Promise<DamageRecord> => {
    const response = await api.get(`/damage-records/${id}`);
    return transformDamageRecord(response.data);
  },

  create: async (data: DamageRecordCreate): Promise<DamageRecord> => {
    const response = await api.post("/damage-records", toSnakeCase(data));
    return transformDamageRecord(response.data);
  },

  update: async (
    id: string,
    data: DamageRecordUpdate
  ): Promise<DamageRecord> => {
    const response = await api.put(`/damage-records/${id}`, toSnakeCase(data));
    return transformDamageRecord(response.data);
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/damage-records/${id}`);
  },
};
