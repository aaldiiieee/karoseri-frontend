import { useState } from "react";
import { Brain, Loader2, Play, Trophy, BarChart3 } from "lucide-react";
import { cn } from "@/shared/lib/utils";

import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

import { useTrainModel, useModelMetrics } from "../hooks/useTraining";
import { useModelStatus } from "../hooks/usePrediction";
import type { TrainingResult } from "../types/training.type";

export function ModelTrainingView() {
  const [trainResult, setTrainResult] = useState<TrainingResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const trainMutation = useTrainModel();
  const { data: status } = useModelStatus();
  const { data: metrics } = useModelMetrics();

  const handleTrain = async () => {
    setError(null);
    setTrainResult(null);

    try {
      const result = await trainMutation.mutateAsync({});
      setTrainResult(result);
    } catch {
      setError("Gagal melatih model. Pastikan terdapat cukup data pelatihan.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="rounded-xl bg-primary/10 p-2.5">
          <Brain className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Model & Pelatihan
          </h1>
          <p className="mt-1 text-muted-foreground">
            Latih model Naive Bayes dan pantau performa klasifikasi.
          </p>
        </div>
      </div>

      {/* Model Status + Train Button */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Status Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Status Model</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "h-3 w-3 rounded-full",
                  status?.isTrained
                    ? "bg-emerald-500 shadow-emerald-500/50 shadow-sm"
                    : "bg-rose-500 shadow-rose-500/50 shadow-sm"
                )}
              />
              <span className="font-medium text-foreground">
                {status?.isTrained ? "Terlatih" : "Belum Terlatih"}
              </span>
            </div>
            {status?.trainingSamples && (
              <p className="mt-2 text-sm text-muted-foreground">
                {status.trainingSamples} data pelatihan
              </p>
            )}
          </CardContent>
        </Card>

        {/* Accuracy Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Akurasi Terakhir</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-foreground">
                {status?.accuracy
                  ? `${(status.accuracy * 100).toFixed(1)}%`
                  : "—"}
              </span>
            </div>
            {status?.lastTrainedAt && (
              <p className="mt-2 text-sm text-muted-foreground">
                Terakhir:{" "}
                {new Date(status.lastTrainedAt).toLocaleDateString("id-ID")}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Train Button Card */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Pelatihan Model</CardTitle>
            <CardDescription>
              Latih ulang model dengan data terbaru
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleTrain}
              disabled={trainMutation.isPending}
              className="w-full gap-2"
            >
              {trainMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Melatih Model...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  Mulai Pelatihan
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Training Result */}
      {trainResult && (
        <Card className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-amber-500" />
              <CardTitle>Hasil Pelatihan</CardTitle>
            </div>
            <CardDescription>{trainResult.message}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <MetricItem
                label="Accuracy"
                value={`${(trainResult.accuracy * 100).toFixed(1)}%`}
              />
              <MetricItem
                label="Precision"
                value={`${(trainResult.precision * 100).toFixed(1)}%`}
              />
              <MetricItem
                label="Recall"
                value={`${(trainResult.recall * 100).toFixed(1)}%`}
              />
              <MetricItem
                label="F1 Score"
                value={`${(trainResult.f1Score * 100).toFixed(1)}%`}
              />
            </div>

            <div className="mt-4 text-sm text-muted-foreground">
              <p>
                Training samples: {trainResult.trainingSamples} | Test samples:{" "}
                {trainResult.testSamples}
              </p>
            </div>

            {/* Confusion Matrix */}
            {trainResult.confusionMatrix && (
              <div className="mt-6">
                <h4 className="mb-3 text-sm font-semibold text-foreground">
                  Confusion Matrix
                </h4>
                <ConfusionMatrix matrix={trainResult.confusionMatrix} />
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Metrics History */}
      {metrics && metrics.items.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <CardTitle>Riwayat Pelatihan</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Tanggal
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Accuracy
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Precision
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Recall
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      F1
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">
                      Samples
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {metrics.items.map((m) => (
                    <tr key={m.id} className="hover:bg-muted/50">
                      <td className="px-4 py-3 text-sm">
                        {new Date(m.createdAt).toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-4 py-3 font-mono text-sm font-semibold">
                        {(m.accuracy * 100).toFixed(1)}%
                      </td>
                      <td className="px-4 py-3 font-mono text-sm">
                        {(m.precision * 100).toFixed(1)}%
                      </td>
                      <td className="px-4 py-3 font-mono text-sm">
                        {(m.recall * 100).toFixed(1)}%
                      </td>
                      <td className="px-4 py-3 font-mono text-sm">
                        {(m.f1Score * 100).toFixed(1)}%
                      </td>
                      <td className="px-4 py-3 font-mono text-sm">
                        {m.trainingSamples}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function MetricItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-muted/30 p-4 text-center">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-bold text-foreground">{value}</p>
    </div>
  );
}

function ConfusionMatrix({ matrix }: { matrix: number[][] }) {
  const LABELS = ["Ringan", "Sedang", "Berat"];
  const COLORS = [
    "bg-emerald-100 dark:bg-emerald-900/30",
    "bg-amber-100 dark:bg-amber-900/30",
    "bg-rose-100 dark:bg-rose-900/30",
  ];

  return (
    <div className="inline-block overflow-hidden rounded-lg border">
      <table className="text-sm">
        <thead>
          <tr className="bg-muted/50">
            <th className="px-4 py-2 text-xs text-muted-foreground">
              Actual ↓ / Predicted →
            </th>
            {LABELS.map((l) => (
              <th
                key={l}
                className="px-4 py-2 text-center text-xs font-medium text-muted-foreground"
              >
                {l}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {matrix.map((row, i) => (
            <tr key={i}>
              <td
                className={cn(
                  "px-4 py-2 text-xs font-medium",
                  COLORS[i]
                )}
              >
                {LABELS[i]}
              </td>
              {row.map((cell, j) => (
                <td
                  key={j}
                  className={cn(
                    "px-4 py-2 text-center font-mono font-semibold",
                    i === j ? "bg-primary/10 text-primary" : ""
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
