import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { ApiError } from "@/shared/lib/api/error";
import { AxiosError } from "axios";

import { KaroseriComponentForm } from "../components/KaroseriComponentForm";
import {
  componentFormSchema,
  componentFormDefaultValues,
  type ComponentFormValues,
} from "../schema/componentForm.schema";
import { useCreateComponent } from "../hooks/useKaroseriComponent";

export function KaroseriComponentAddView() {
  const navigate = useNavigate();

  const form = useForm<ComponentFormValues>({
    resolver: zodResolver(componentFormSchema),
    defaultValues: componentFormDefaultValues,
  });

  const createMutation = useCreateComponent();

  const handleSubmit = async (values: ComponentFormValues) => {
    const payload = {
      componentCode: values.code,
      componentName: values.name,
      category: values.category,
      description: values.description || undefined,
    };

    try {
      await createMutation.mutateAsync(payload);
      navigate("/master-data/component");
    } catch (error) {
      handleSubmitError(error);
    }
  };

  const handleSubmitError = (error: unknown) => {
    if (error instanceof ApiError) {
      return;
    }

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
        // Handle other types of errors (e.g., show a toast notification)
        console.error("Submission error:", apiError);
      }
    }
  };

  const handleCancel = () => {
    navigate("/master-data/component");
  };

  return (
    <div className="space-y-6">
      <PageHeader onBack={handleCancel} />

      <Card>
        <CardHeader>
          <CardTitle>Informasi Komponen</CardTitle>
          <CardDescription>
            Lengkapi data komponen dengan benar. Field bertanda{" "}
            <span className="text-destructive">*</span> wajib diisi.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <KaroseriComponentForm
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

interface PageHeaderProps {
  onBack: () => void;
}

function PageHeader({ onBack }: PageHeaderProps) {
  return (
    <div className="flex items-center gap-4">
      <Button variant="ghost" size="icon" onClick={onBack}>
        <ArrowLeft className="h-5 w-5" />
      </Button>
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Tambah Komponen
        </h1>
        <p className="text-sm text-muted-foreground">
          Tambahkan komponen karoseri baru ke sistem
        </p>
      </div>
    </div>
  );
}
