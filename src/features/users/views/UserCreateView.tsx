import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { AxiosError } from "axios";

import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { ApiError } from "@/shared/lib/api/error";

import { UserForm } from "../components/UserForm";
import {
  userCreateSchema,
  userCreateDefaultValues,
  type UserFormValues,
} from "../schema/user.schema";
import { useCreateUser } from "../hooks/useUser";

export function UserCreateView() {
  const navigate = useNavigate();

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userCreateSchema),
    defaultValues: userCreateDefaultValues,
  });

  const createMutation = useCreateUser();

  const handleSubmit = async (values: UserFormValues) => {
    try {
      await createMutation.mutateAsync({
        username: values.username,
        password: values.password ?? "",
        role: values.role,
      });
      navigate("/settings/team");
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = (error: unknown) => {
    if (error instanceof ApiError) return;

    if (error instanceof AxiosError) {
      const apiError = ApiError.fromAxiosError(error);

      if (apiError.isValidationError && apiError.errors) {
        Object.entries(apiError.errors).forEach(([field, messages]) => {
          form.setError(field as keyof UserFormValues, {
            type: "server",
            message: messages[0],
          });
        });
      } else {
        console.error("Submission error:", apiError);
      }
    }
  };

  const handleCancel = () => {
    navigate("/settings/team");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={handleCancel}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Tambah Pengguna
          </h1>
          <p className="text-sm text-muted-foreground">
            Buat akun pengguna baru untuk mengakses sistem
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Formulir Pengguna</CardTitle>
          <CardDescription>
            Lengkapi informasi pengguna baru. Password minimal 6 karakter.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <UserForm
            form={form}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={createMutation.isPending}
          />
        </CardContent>
      </Card>
    </div>
  );
}
