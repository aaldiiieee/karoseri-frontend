import { z } from "zod";

const baseSchema = z.object({
  username: z.string().min(3, { message: "Username minimal 3 karakter" }),
  password: z.string().optional().or(z.literal("")),
  role: z.enum(["admin", "technician"] as const),
  isActive: z.boolean(),
});

export type UserFormValues = z.infer<typeof baseSchema>;

export const userCreateSchema = baseSchema.refine(
  (data) => Boolean(data.password) && data.password!.length >= 6,
  { message: "Password minimal 6 karakter", path: ["password"] }
);

export const userEditSchema = baseSchema.refine(
  (data) => !data.password || data.password.length >= 6,
  { message: "Password minimal 6 karakter", path: ["password"] }
);

export const userCreateDefaultValues: UserFormValues = {
  username: "",
  password: "",
  role: "technician",
  isActive: true,
};

export const userEditDefaultValues: UserFormValues = {
  username: "",
  password: "",
  role: "technician",
  isActive: true,
};
