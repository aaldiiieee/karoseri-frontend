import { useState, useRef, useCallback } from "react";
import {
  Upload,
  FileSpreadsheet,
  X,
  CheckCircle2,
  AlertTriangle,
  Download,
  Loader2,
  FileUp,
} from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/components/ui/button";

interface ImportResult {
  successCount: number;
  errorCount: number;
  errors: string[];
}

interface DatasetImportDialogProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  onImport: (file: File) => Promise<ImportResult>;
  onDownloadTemplate: () => Promise<void>;
}

type ImportPhase = "idle" | "uploading" | "done";

export function DatasetImportDialog({
  open,
  onClose,
  title = "Import Dataset",
  onImport,
  onDownloadTemplate,
}: DatasetImportDialogProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [phase, setPhase] = useState<ImportPhase>("idle");
  const [result, setResult] = useState<ImportResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const reset = useCallback(() => {
    setFile(null);
    setPhase("idle");
    setResult(null);
    setError(null);
  }, []);

  const handleClose = () => {
    reset();
    onClose();
  };

  const isValidFile = (f: File) => {
    const name = f.name.toLowerCase();
    return name.endsWith(".xlsx") || name.endsWith(".csv");
  };

  const handleFileSelect = (f: File) => {
    if (!isValidFile(f)) {
      setError("Format file tidak didukung. Gunakan .xlsx atau .csv");
      return;
    }
    setError(null);
    setFile(f);
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile) handleFileSelect(droppedFile);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleUpload = async () => {
    if (!file) return;
    setPhase("uploading");
    setError(null);

    try {
      const res = await onImport(file);
      setResult(res);
      setPhase("done");
    } catch {
      setError("Gagal mengimpor file. Periksa format dan konten file Anda.");
      setPhase("idle");
    }
  };

  const handleDownloadTemplate = async () => {
    try {
      await onDownloadTemplate();
    } catch {
      setError("Gagal mengunduh template.");
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={handleClose}
      />

      {/* Dialog */}
      <div className="relative w-full max-w-lg rounded-2xl border bg-card shadow-2xl animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-primary/10 p-2">
              <FileUp className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                {title}
              </h2>
              <p className="text-sm text-muted-foreground">
                Upload file Excel (.xlsx) atau CSV
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5">
          {/* Upload Phase */}
          {phase !== "done" && (
            <>
              {/* Drop Zone */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragOver(true);
                }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  "group relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition-all duration-200",
                  isDragOver
                    ? "border-primary bg-primary/5 scale-[1.02]"
                    : "border-border hover:border-primary/50 hover:bg-accent/50",
                  file && "border-primary/30 bg-primary/5"
                )}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".xlsx,.csv"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleFileSelect(f);
                  }}
                />

                {!file ? (
                  <>
                    <div className="rounded-full bg-primary/10 p-3 mb-3 group-hover:bg-primary/20 transition-colors">
                      <Upload className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                    </div>
                    <p className="text-sm font-medium text-foreground">
                      Seret file ke sini atau{" "}
                      <span className="text-primary">pilih file</span>
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      .xlsx atau .csv (maks 5MB)
                    </p>
                  </>
                ) : (
                  <div className="flex items-center gap-3 w-full">
                    <div className="rounded-lg bg-emerald-500/10 p-2.5">
                      <FileSpreadsheet className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setFile(null);
                      }}
                      className="rounded-lg p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3">
                  <AlertTriangle className="h-4 w-4 text-destructive mt-0.5 shrink-0" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              {/* Template Download */}
              <button
                onClick={handleDownloadTemplate}
                className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
              >
                <Download className="h-4 w-4" />
                Download template Excel
              </button>
            </>
          )}

          {/* Result Phase */}
          {phase === "done" && result && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
              {/* Success Summary */}
              <div className="flex items-center gap-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-4 py-3">
                <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                    {result.successCount} data berhasil diimpor
                  </p>
                  {result.errorCount > 0 && (
                    <p className="text-xs text-amber-600 dark:text-amber-400 mt-0.5">
                      {result.errorCount} baris gagal diproses
                    </p>
                  )}
                </div>
              </div>

              {/* Error Details */}
              {result.errors.length > 0 && (
                <div className="rounded-xl border bg-muted/30 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                    <p className="text-sm font-medium text-foreground">
                      Detail Error
                    </p>
                  </div>
                  <div className="max-h-32 overflow-y-auto space-y-1">
                    {result.errors.map((err, i) => (
                      <p key={i} className="text-xs text-muted-foreground font-mono">
                        {err}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t px-6 py-4">
          {phase === "done" ? (
            <Button onClick={handleClose}>Selesai</Button>
          ) : (
            <>
              <Button variant="outline" onClick={handleClose}>
                Batal
              </Button>
              <Button
                onClick={handleUpload}
                disabled={!file || phase === "uploading"}
                className="gap-2"
              >
                {phase === "uploading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Mengimpor...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    Import Data
                  </>
                )}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
