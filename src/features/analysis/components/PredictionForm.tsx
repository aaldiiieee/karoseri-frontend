import type { UseFormReturn } from "react-hook-form";
import { Loader2, Zap } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import type { PredictionFormValues } from "../schema/predictionForm.schema";
import { useComponents } from "@/features/master-data/hooks/useKaroseriComponent";

interface PredictionFormProps {
  form: UseFormReturn<PredictionFormValues>;
  onSubmit: (values: PredictionFormValues) => void;
  isLoading?: boolean;
  isModelTrained?: boolean;
}

export function PredictionForm({
  form,
  onSubmit,
  isLoading = false,
  isModelTrained = true,
}: PredictionFormProps) {
  const { data: components } = useComponents();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Component Selector */}
        <FormField
          control={form.control}
          name="componentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Komponen <span className="text-destructive">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih komponen" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {components?.items.map((comp) => (
                    <SelectItem key={comp.id} value={comp.id}>
                      {comp.componentCode} — {comp.componentName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-6">
          {/* Section: Physical Dimensions */}
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground/80">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">1</span>
              Dimensi Kerusakan
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <NumberField
                form={form}
                name="damageArea"
                label="Luas Kerusakan"
                placeholder="cm²"
                description="Luas area yang rusak"
                required
              />
              <NumberField
                form={form}
                name="damageDepth"
                label="Kedalaman"
                placeholder="mm"
                description="Kedalaman kerusakan"
                required
              />
              <NumberField
                form={form}
                name="damagePointCount"
                label="Jumlah Titik"
                placeholder="jumlah"
                description="Banyaknya titik"
                required
                isInteger
              />
              <NumberField
                form={form}
                name="deformation"
                label="Deformasi"
                placeholder="mm"
                description="Tingkat deformasi"
                required
              />
            </div>
          </div>

          {/* Section: Usage & Condition */}
          <div className="space-y-4">
            <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground/80">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-xs text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">2</span>
              Kondisi & Penggunaan
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <NumberField
                form={form}
                name="componentAge"
                label="Usia Komponen"
                placeholder="bulan"
                description="Usia dalam bulan"
                required
                isInteger
              />
              <NumberField
                form={form}
                name="usageFrequency"
                label="Frekuensi Pakai"
                placeholder="1-10"
                description="1 (jarang) - 10 (sering)"
                required
                isInteger
              />
              <NumberField
                form={form}
                name="corrosionLevel"
                label="Level Korosi"
                placeholder="1-5"
                description="1 (min) - 5 (parah)"
                required
                isInteger
              />
            </div>
          </div>
        </div>

        {/* Notes */}
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Catatan</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Catatan tambahan (opsional)"
                  className="min-h-[80px] resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit */}
        <Button
          type="submit"
          disabled={isLoading || !isModelTrained}
          className="w-full gap-2"
          size="lg"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Menganalisis...
            </>
          ) : (
            <>
              <Zap className="h-4 w-4" />
              Prediksi Kerusakan
            </>
          )}
        </Button>

        {!isModelTrained && (
          <p className="text-center text-sm text-destructive">
            Model belum di-train. Silakan train model terlebih dahulu.
          </p>
        )}
      </form>
    </Form>
  );
}

// Reusable number field
function NumberField({
  form,
  name,
  label,
  placeholder,
  description,
  required,
  isInteger,
}: {
  form: UseFormReturn<PredictionFormValues>;
  name: keyof PredictionFormValues;
  label: string;
  placeholder: string;
  description?: string;
  required?: boolean;
  isInteger?: boolean;
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label} {required && <span className="text-destructive">*</span>}
          </FormLabel>
          <FormControl>
            <Input
              type="number"
              step={isInteger ? "1" : "0.1"}
              placeholder={placeholder}
              {...field}
              onChange={(e) => {
                const val = e.target.value;
                field.onChange(
                  val === "" ? 0 : isInteger ? parseInt(val) : parseFloat(val)
                );
              }}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
