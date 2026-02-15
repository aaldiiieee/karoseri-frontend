import { z } from "zod";

/**
 * Validation schema for component form
 */
export const componentFormSchema = z.object({
  code: z
    .string()
    .min(1, "Kode komponen wajib diisi")
    .max(50, "Kode komponen maksimal 50 karakter")
    .regex(
      /^[A-Z0-9-_]+$/,
      "Kode hanya boleh berisi huruf kapital, angka, strip, dan underscore",
    ),
  name: z
    .string()
    .min(1, "Nama komponen wajib diisi")
    .max(100, "Nama komponen maksimal 100 karakter"),
  category: z.string().min(1, "Kategori wajib dipilih"),
  description: z
    .string()
    .max(500, "Deskripsi maksimal 500 karakter")
    .optional()
    .or(z.literal("")),
});

/**
 * Type definition for component form values
 */
export type ComponentFormValues = z.infer<typeof componentFormSchema>;

/**
 * Default values for component form
 */
export const componentFormDefaultValues: ComponentFormValues = {
  code: "",
  name: "",
  category: "",
  description: "",
};
