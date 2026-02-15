import { cn } from "@/shared/lib/utils";
import { CheckCircle2, TrendingUp, Info } from "lucide-react";
import type { PredictionResult } from "../types/prediction.type";

interface PredictionResultCardProps {
  result: PredictionResult;
}

const LEVEL_STYLES: Record<
  string,
  { gradient: string; badge: string; label: string }
> = {
  ringan: {
    gradient: "from-emerald-500/10 to-emerald-500/5",
    badge:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    label: "Kerusakan Ringan",
  },
  sedang: {
    gradient: "from-amber-500/10 to-amber-500/5",
    badge:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    label: "Kerusakan Sedang",
  },
  berat: {
    gradient: "from-rose-500/10 to-rose-500/5",
    badge: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
    label: "Kerusakan Berat",
  },
};

const PROB_COLORS: Record<string, string> = {
  ringan: "bg-emerald-500",
  sedang: "bg-amber-500",
  berat: "bg-rose-500",
};

export const PredictionResultCard = ({ result }: PredictionResultCardProps) => {
  const levelKey = result.predictedLevel.toLowerCase();
  const style = LEVEL_STYLES[levelKey] || LEVEL_STYLES.ringan;

  return (
    <div
      className={cn(
        "animate-in fade-in slide-in-from-bottom-4 rounded-xl border bg-gradient-to-br p-6 shadow-sm duration-500",
        style.gradient
      )}
    >
      {/* Success Header */}
      <div className="mb-5 flex items-center gap-2">
        <CheckCircle2 className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">
          Hasil Prediksi
        </h3>
      </div>

      {/* Main Result */}
      <div className="mb-6 text-center">
        <span
          className={cn(
            "inline-block rounded-xl px-6 py-3 text-xl font-bold",
            style.badge
          )}
        >
          {style.label}
        </span>
        <div className="mt-3 flex items-center justify-center gap-2">
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Confidence:{" "}
            <span className="font-semibold text-foreground">
              {(result.confidence * 100).toFixed(1)}%
            </span>
          </span>
        </div>
      </div>

      {/* Probability Breakdown */}
      <div className="space-y-3">
        <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
          <Info className="h-3.5 w-3.5" />
          Distribusi Probabilitas
        </div>
        {(["ringan", "sedang", "berat"] as const).map((level) => {
          const prob = result.probabilities[level];
          return (
            <div key={level} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="capitalize text-foreground">{level}</span>
                <span className="font-mono font-semibold text-foreground">
                  {(prob * 100).toFixed(1)}%
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-700",
                    PROB_COLORS[level]
                  )}
                  style={{ width: `${(prob * 100).toFixed(1)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Features Used */}
      <div className="mt-6 rounded-lg border bg-card/50 p-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Parameter Digunakan
        </p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <FeatureItem
            label="Luas"
            value={`${result.featuresUsed.damageArea} cm²`}
          />
          <FeatureItem
            label="Kedalaman"
            value={`${result.featuresUsed.damageDepth} mm`}
          />
          <FeatureItem
            label="Titik"
            value={String(result.featuresUsed.damagePointCount)}
          />
          <FeatureItem
            label="Usia"
            value={`${result.featuresUsed.componentAge} bln`}
          />
          <FeatureItem
            label="Frek."
            value={String(result.featuresUsed.usageFrequency)}
          />
          <FeatureItem
            label="Korosi"
            value={String(result.featuresUsed.corrosionLevel)}
          />
          <FeatureItem
            label="Deformasi"
            value={`${result.featuresUsed.deformation} mm`}
          />
        </div>
      </div>
    </div>
  );
};

function FeatureItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-mono font-medium text-foreground">{value}</span>
    </div>
  );
}
