import { useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  Loader2,
  CheckCircle2,
  TrendingUp,
  Info,
  Package,
  Tag,
  Hash,
  StickyNote,
} from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { usePrediction } from "../hooks/usePrediction";
import type { PredictionResponse } from "../types/prediction.type";

// ─── Style maps ──────────────────────────────────────────────────────────────

const LEVEL_STYLES: Record<
  string,
  { gradient: string; badge: string; border: string; label: string }
> = {
  ringan: {
    gradient: "from-emerald-500/10 to-emerald-500/5",
    badge:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    border: "border-emerald-200 dark:border-emerald-800",
    label: "Kerusakan Ringan",
  },
  sedang: {
    gradient: "from-amber-500/10 to-amber-500/5",
    badge:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    border: "border-amber-200 dark:border-amber-800",
    label: "Kerusakan Sedang",
  },
  berat: {
    gradient: "from-rose-500/10 to-rose-500/5",
    badge: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
    border: "border-rose-200 dark:border-rose-800",
    label: "Kerusakan Berat",
  },
};

const PROB_COLORS: Record<string, string> = {
  ringan: "bg-emerald-500",
  sedang: "bg-amber-500",
  berat: "bg-rose-500",
};

// ─── Main View ───────────────────────────────────────────────────────────────

export function PredictionDetailView() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: prediction, isLoading } = usePrediction(id!);

  const handleBack = () => navigate("/analysis");

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!prediction) {
    return (
      <div className="flex h-[400px] flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground">Data tidak ditemukan.</p>
        <Button variant="outline" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={handleBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Detail Klasifikasi
          </h1>
          <p className="text-sm text-muted-foreground">
            Hasil analisis kerusakan komponen karoseri
          </p>
        </div>
      </div>

      {/* Main Result Banner */}
      <ResultBanner prediction={prediction} />

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ComponentInfoCard prediction={prediction} />
        <ProbabilityCard prediction={prediction} />
      </div>

      {/* Parameters Card */}
      <ParametersCard prediction={prediction} />

      {/* Notes */}
      {prediction.notes && <NotesCard notes={prediction.notes} />}
    </div>
  );
}

// ─── Result Banner ────────────────────────────────────────────────────────────

function ResultBanner({ prediction }: { prediction: PredictionResponse }) {
  const levelKey = prediction.predictedLevel.toLowerCase();
  const style = LEVEL_STYLES[levelKey] ?? LEVEL_STYLES.ringan;

  return (
    <div
      className={cn(
        "rounded-xl border bg-gradient-to-br p-6 shadow-sm",
        style.gradient,
        style.border
      )}
    >
      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="h-6 w-6 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Hasil Prediksi</p>
            <span
              className={cn(
                "mt-1 inline-block rounded-lg px-4 py-1.5 text-lg font-bold",
                style.badge
              )}
            >
              {style.label}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-right">
          <TrendingUp className="h-5 w-5 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">Confidence</p>
            <p className="text-2xl font-bold text-foreground">
              {(prediction.confidence * 100).toFixed(1)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Component Info ───────────────────────────────────────────────────────────

function ComponentInfoCard({ prediction }: { prediction: PredictionResponse }) {
  const comp = prediction.component;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Package className="h-4 w-4 text-muted-foreground" />
          Informasi Komponen
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <InfoRow
          label="Nama Komponen"
          value={comp?.name ?? "—"}
        />
        <InfoRow
          label="Kode"
          value={
            comp?.code ? (
              <span className="rounded bg-muted px-2 py-0.5 font-mono text-sm">
                {comp.code}
              </span>
            ) : (
              "—"
            )
          }
        />
        <InfoRow
          label="Kategori"
          value={
            comp?.category ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                <Tag className="h-3 w-3" />
                {comp.category}
              </span>
            ) : (
              "—"
            )
          }
        />
        {comp?.description && (
          <InfoRow label="Deskripsi" value={comp.description} />
        )}
      </CardContent>
    </Card>
  );
}

// ─── Probability Card ─────────────────────────────────────────────────────────

function ProbabilityCard({ prediction }: { prediction: PredictionResponse }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Info className="h-4 w-4 text-muted-foreground" />
          Distribusi Probabilitas
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {(["ringan", "sedang", "berat"] as const).map((level) => {
          const prob = prediction.probabilities[level];
          const isWinner =
            prediction.predictedLevel.toLowerCase() === level;
          return (
            <div key={level} className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span
                  className={cn(
                    "flex items-center gap-1.5 capitalize font-medium",
                    isWinner ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {isWinner && (
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                  )}
                  {level}
                </span>
                <span
                  className={cn(
                    "font-mono font-semibold",
                    isWinner ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {(prob * 100).toFixed(1)}%
                </span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-muted">
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
      </CardContent>
    </Card>
  );
}

// ─── Parameters Card ──────────────────────────────────────────────────────────

const PARAMS = [
  {
    section: "Dimensi Kerusakan",
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    fields: [
      { label: "Luas Kerusakan", key: "damageArea" as const, unit: "cm²" },
      { label: "Kedalaman", key: "damageDepth" as const, unit: "mm" },
      { label: "Jumlah Titik", key: "damagePointCount" as const, unit: "titik" },
      { label: "Deformasi", key: "deformation" as const, unit: "mm" },
    ],
  },
  {
    section: "Kondisi & Penggunaan",
    color:
      "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
    fields: [
      { label: "Usia Komponen", key: "componentAge" as const, unit: "bulan" },
      {
        label: "Frekuensi Pakai",
        key: "usageFrequency" as const,
        unit: "/ 10",
      },
      { label: "Level Korosi", key: "corrosionLevel" as const, unit: "/ 5" },
    ],
  },
];

function ParametersCard({ prediction }: { prediction: PredictionResponse }) {
  const f = prediction.featuresUsed;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Hash className="h-4 w-4 text-muted-foreground" />
          Parameter Input
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-2">
          {PARAMS.map(({ section, color, fields }) => (
            <div key={section} className="space-y-3">
              <p
                className={cn(
                  "inline-flex items-center rounded-md px-2.5 py-1 text-xs font-semibold",
                  color
                )}
              >
                {section}
              </p>
              <div className="space-y-2">
                {fields.map(({ label, key, unit }) => (
                  <div
                    key={key}
                    className="flex items-center justify-between rounded-lg border bg-muted/30 px-3 py-2"
                  >
                    <span className="text-sm text-muted-foreground">
                      {label}
                    </span>
                    <span className="font-mono text-sm font-semibold text-foreground">
                      {f[key]}
                      <span className="ml-1 text-xs font-normal text-muted-foreground">
                        {unit}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Notes Card ───────────────────────────────────────────────────────────────

function NotesCard({ notes }: { notes: string }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <StickyNote className="h-4 w-4 text-muted-foreground" />
          Catatan
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground leading-relaxed">{notes}</p>
      </CardContent>
    </Card>
  );
}

// ─── Shared Helper ────────────────────────────────────────────────────────────

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground text-right">
        {value}
      </span>
    </div>
  );
}
