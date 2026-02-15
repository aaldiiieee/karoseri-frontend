import { z } from "zod";

/**
 * Validation schema for prediction form
 */
export const predictionFormSchema = z.object({
  componentId: z.string().min(1, "Komponen wajib dipilih"),
  damageArea: z
    .number({ message: "Harus berupa angka" })
    .positive("Luas kerusakan harus > 0"),
  damageDepth: z
    .number({ message: "Harus berupa angka" })
    .positive("Kedalaman kerusakan harus > 0"),
  damagePointCount: z
    .number({ message: "Harus berupa angka" })
    .int("Harus bilangan bulat")
    .positive("Jumlah titik kerusakan harus > 0"),
  componentAge: z
    .number({ message: "Harus berupa angka" })
    .int("Harus bilangan bulat")
    .positive("Usia komponen harus > 0"),
  usageFrequency: z
    .number({ message: "Harus berupa angka" })
    .int("Harus bilangan bulat")
    .min(1, "Frekuensi penggunaan minimal 1")
    .max(10, "Frekuensi penggunaan maksimal 10"),
  corrosionLevel: z
    .number({ message: "Harus berupa angka" })
    .int("Harus bilangan bulat")
    .min(1, "Level korosi minimal 1")
    .max(5, "Level korosi maksimal 5"),
  deformation: z
    .number({ message: "Harus berupa angka" })
    .min(0, "Deformasi tidak boleh negatif"),
  notes: z
    .string()
    .max(500, "Catatan maksimal 500 karakter")
    .optional()
    .or(z.literal("")),
});

export type PredictionFormValues = z.infer<typeof predictionFormSchema>;

export const predictionFormDefaultValues: PredictionFormValues = {
  componentId: "",
  damageArea: 0,
  damageDepth: 0,
  damagePointCount: 0,
  componentAge: 0,
  usageFrequency: 1,
  corrosionLevel: 1,
  deformation: 0,
  notes: "",
};
