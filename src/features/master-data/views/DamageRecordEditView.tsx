import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2 } from "lucide-react";
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
import { useDamageRecord, useUpdateDamageRecord } from "../hooks/useDamageRecord";

export function DamageRecordEditView() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { data: record, isLoading: isLoadingRecord } = useDamageRecord(id!);
  const updateMutation = useUpdateDamageRecord();

  const form = useForm<DamageRecordFormValues>({
    resolver: zodResolver(damageRecordFormSchema),
    defaultValues: damageRecordFormDefaultValues,
  });

  // Populate form when data is loaded
  useEffect(() => {
    if (record) {
      form.reset({
        componentId: record.componentId,
        damageArea: record.damageArea,
        damageDepth: record.damageDepth,
        damagePointCount: record.damagePointCount,
        componentAge: record.componentAge,
        usageFrequency: record.usageFrequency,
        corrosionLevel: record.corrosionLevel,
        deformation: record.deformation,
        damageLevel: record.damageLevel,
        notes: record.notes || "",
      });
    }
  }, [record, form]);

  const handleSubmit = async (values: DamageRecordFormValues) => {
    if (!id) return;

    try {
      await updateMutation.mutateAsync({ id, data: values });
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

  if (isLoadingRecord) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={handleCancel}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Edit Data Kerusakan
          </h1>
          <p className="text-sm text-muted-foreground">
            Perbarui informasi data kerusakan
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit Data Kerusakan</CardTitle>
          <CardDescription>
            Ubah detail kerusakan yang tersimpan. Perubahan akan mempengaruhi training model selanjutnya.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DamageRecordForm
            form={form}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={updateMutation.isPending}
            isEditMode
          />
        </CardContent>
      </Card>
    </div>
  );
}
