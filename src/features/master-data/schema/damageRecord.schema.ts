import { z } from "zod";

export const damageRecordFormSchema = z.object({
  componentId: z.string().min(1, { message: "Komponen harus dipilih" }),
  damageArea: z.number().min(0, { message: "Luas kerusakan tidak boleh negatif" }),
  damageDepth: z.number().min(0, { message: "Kedalaman kerusakan tidak boleh negatif" }),
  damagePointCount: z
    .number()
    .int()
    .min(0, { message: "Jumlah titik tidak boleh negatif" }),
  componentAge: z
    .number()
    .int()
    .min(0, { message: "Usia komponen tidak boleh negatif" }),
  usageFrequency: z
    .number()
    .int()
    .min(1, { message: "Frekuensi penggunaan minimal 1" })
    .max(10, { message: "Frekuensi penggunaan maksimal 10" }),
  corrosionLevel: z
    .number()
    .int()
    .min(1, { message: "Level korosi minimal 1" })
    .max(5, { message: "Level korosi maksimal 5" }),
  deformation: z.number().min(0, { message: "Deformasi tidak boleh negatif" }),
  damageLevel: z.enum(["ringan", "sedang", "berat"] as const, {
    message: "Level kerusakan harus dipilih",
  }),
  notes: z.string().optional(),
});

export type DamageRecordFormValues = z.infer<typeof damageRecordFormSchema>;

export const damageRecordFormDefaultValues: Partial<DamageRecordFormValues> = {
  componentId: "",
  damageArea: 0,
  damageDepth: 0,
  damagePointCount: 0,
  componentAge: 0,
  usageFrequency: 1,
  corrosionLevel: 1,
  deformation: 0,
  damageLevel: "ringan",
  notes: "",
};
