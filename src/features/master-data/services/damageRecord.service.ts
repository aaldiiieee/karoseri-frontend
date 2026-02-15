import { api } from "@/shared/lib/api/axios";
import type {
  DamageRecord,
  DamageRecordCreate,
  DamageRecordUpdate,
  DamageRecordList,
  DamageRecordFilters,
  BulkImportResult,
} from "../types/damageRecord.type";

// Response transformer
// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  bulkImport: async (file: File): Promise<BulkImportResult> => {
    const formData = new FormData();
    formData.append("file", file);
    const response = await api.post("/damage-records/bulk-import", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return {
      successCount: response.data.success_count,
      errorCount: response.data.error_count,
      errors: response.data.errors,
    };
  },

  downloadTemplate: async (): Promise<void> => {
    const response = await api.get("/damage-records/import-template", {
      responseType: "blob",
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.download = "template_data_kerusakan.xlsx";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  },
};
