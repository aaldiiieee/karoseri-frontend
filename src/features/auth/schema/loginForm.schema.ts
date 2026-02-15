import { z } from "zod";

/**
 * Validation schema for login form
 */
export const loginFormSchema = z.object({
  username: z
    .string()
    .min(1, "Username wajib diisi")
    .max(50, "Username maksimal 50 karakter"),
  password: z
    .string()
    .min(1, "Password wajib diisi")
    .max(100, "Password maksimal 100 karakter"),
});

/**
 * Type definition for login form values
 */
export type LoginFormValues = z.infer<typeof loginFormSchema>;

/**
 * Default values for login form
 */
export const loginFormDefaultValues: LoginFormValues = {
  username: "",
  password: "",
};
