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

import { DamageRecordForm } from "../components/DamageRecordForm";
import {
  damageRecordFormSchema,
  damageRecordFormDefaultValues,
  type DamageRecordFormValues,
} from "../schema/damageRecord.schema";
import { useCreateDamageRecord } from "../hooks/useDamageRecord";

export function DamageRecordAddView() {
  const navigate = useNavigate();

  const form = useForm<DamageRecordFormValues>({
    resolver: zodResolver(damageRecordFormSchema),
    defaultValues: damageRecordFormDefaultValues,
  });

  const createMutation = useCreateDamageRecord();

  const handleSubmit = async (values: DamageRecordFormValues) => {
    try {
      await createMutation.mutateAsync(values);
      navigate("/master-data/damage-record");
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = (error: unknown) => {
    if (error instanceof ApiError) return;

    if (error instanceof AxiosError) {
      const apiError =
        error instanceof ApiError ? error : ApiError.fromAxiosError(error);

      if (apiError.isValidationError && apiError.errors) {
        Object.entries(apiError.errors).forEach(([field, messages]) => {
          form.setError(field as keyof DamageRecordFormValues, {
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
    navigate("/master-data/damage-record");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={handleCancel}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Tambah Data Kerusakan
          </h1>
          <p className="text-sm text-muted-foreground">
            Input data kerusakan baru untuk training model
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Formulir Data Kerusakan</CardTitle>
          <CardDescription>
            Lengkapi detail kerusakan komponen. Data ini akan digunakan sebagai **training data** untuk model prediksi.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DamageRecordForm
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
