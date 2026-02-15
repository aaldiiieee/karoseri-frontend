import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { Sparkles } from "lucide-react";

import { ApiError } from "@/shared/lib/api/error";
import {
  predictionFormSchema,
  predictionFormDefaultValues,
  type PredictionFormValues,
} from "../schema/predictionForm.schema";
import { usePredict, useModelStatus } from "../hooks/usePrediction";
import { PredictionForm } from "../components/PredictionForm";
import { PredictionResultCard } from "../components/PredictionResultCard";
import type { PredictionResult } from "../types/prediction.type";

export function AnalysisView() {
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const form = useForm<PredictionFormValues>({
    resolver: zodResolver(predictionFormSchema),
    defaultValues: predictionFormDefaultValues,
  });

  const predictMutation = usePredict();
  const { data: modelStatus } = useModelStatus();

  const handleSubmit = async (values: PredictionFormValues) => {
    setServerError(null);
    setResult(null);

    try {
      const prediction = await predictMutation.mutateAsync({
        data: values,
      });
      setResult(prediction);
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = (error: unknown) => {
    if (error instanceof AxiosError) {
      const apiError = ApiError.fromAxiosError(error);
      if (apiError.isValidationError && apiError.errors) {
        Object.entries(apiError.errors).forEach(([field, messages]) => {
          form.setError(field as keyof PredictionFormValues, {
            type: "server",
            message: messages[0],
          });
        });
      } else {
        setServerError(apiError.message || "Terjadi kesalahan pada server.");
      }
    } else {
      setServerError("Tidak dapat terhubung ke server.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="rounded-xl bg-primary/10 p-2.5">
          <Sparkles className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Analisis Kerusakan
          </h1>
          <p className="mt-1 text-muted-foreground">
            Masukkan parameter kerusakan untuk mendapatkan prediksi tingkat
            kerusakan menggunakan Naive Bayes.
          </p>
        </div>
      </div>

      {/* Server Error Banner */}
      {serverError && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-800/50 dark:bg-red-900/20 dark:text-red-400">
          <p>{serverError}</p>
        </div>
      )}

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Form */}
        <div className="lg:col-span-3">
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-foreground">
              Parameter Kerusakan
            </h2>
            <PredictionForm
              form={form}
              onSubmit={handleSubmit}
              isLoading={predictMutation.isPending}
              isModelTrained={modelStatus?.isTrained ?? true}
            />
          </div>
        </div>

        {/* Result */}
        <div className="lg:col-span-2">
          {result ? (
            <PredictionResultCard result={result} />
          ) : (
            <div className="flex h-full min-h-[300px] items-center justify-center rounded-xl border border-dashed bg-card/50 p-6">
              <div className="text-center">
                <Sparkles className="mx-auto h-12 w-12 text-muted-foreground/30" />
                <p className="mt-4 text-sm font-medium text-muted-foreground">
                  Hasil prediksi akan muncul di sini
                </p>
                <p className="mt-1 text-xs text-muted-foreground/70">
                  Isi form dan klik "Prediksi Kerusakan"
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
