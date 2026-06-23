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

import { KaroseriComponentForm } from "../components/KaroseriComponentForm";
import {
  componentFormSchema,
  componentFormDefaultValues,
  type ComponentFormValues,
} from "../schema/componentForm.schema";
import { useComponent, useUpdateComponent } from "../hooks/useKaroseriComponent";

export function KaroseriComponentEditView() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { data: component, isLoading: isLoadingComponent } = useComponent(id!);
  const updateMutation = useUpdateComponent();

  const form = useForm<ComponentFormValues>({
    resolver: zodResolver(componentFormSchema),
    defaultValues: componentFormDefaultValues,
    values: component
      ? {
          code: component.componentCode,
          name: component.componentName,
          category: component.category,
          description: component.description ?? "",
        }
      : undefined,
  });

  const handleSubmit = async (values: ComponentFormValues) => {
    if (!id) return;

    try {
      await updateMutation.mutateAsync({
        id,
        data: {
          componentCode: values.code,
          componentName: values.name,
          category: values.category,
          description: values.description || undefined,
        },
      });
      navigate("/master-data/component");
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
          form.setError(field as keyof ComponentFormValues, {
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
    navigate("/master-data/component");
  };

  if (isLoadingComponent) {
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
            Edit Komponen
          </h1>
          <p className="text-sm text-muted-foreground">
            Perbarui informasi komponen karoseri
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit Komponen</CardTitle>
          <CardDescription>
            Ubah detail komponen. Field bertanda{" "}
            <span className="text-destructive">*</span> wajib diisi.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <KaroseriComponentForm
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
