import type { UseFormReturn } from "react-hook-form";
import { Loader2, Save } from "lucide-react";

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
import type { DamageRecordFormValues } from "../schema/damageRecord.schema";
import { useComponents } from "../hooks/useKaroseriComponent";

interface DamageRecordFormProps {
  form: UseFormReturn<DamageRecordFormValues>;
  onSubmit: (values: DamageRecordFormValues) => void;
  onCancel: () => void;
  isLoading?: boolean;
  isEditMode?: boolean;
}

export function DamageRecordForm({
  form,
  onSubmit,
  onCancel,
  isLoading = false,
  isEditMode = false,
}: DamageRecordFormProps) {
  const { data: components } = useComponents();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Section 1: Component Selection */}
        <div className="space-y-4">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground/80">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
              1
            </span>
            Informasi Komponen
          </h3>
          <FormField
            control={form.control}
            name="componentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Komponen <span className="text-destructive">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                // disabled={isEditMode} // Usually we allow editing if needed, or disable if strict
                >
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
                <FormDescription>
                  Pilih komponen yang mengalami kerusakan.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Section 2: Physical Dimensions */}
        <div className="space-y-4">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground/80">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-100 text-xs text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
              2
            </span>
            Dimensi Kerusakan
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <NumberField
              form={form}
              name="damageArea"
              label="Luas Kerusakan"
              placeholder="cm²"
              required
            />
            <NumberField
              form={form}
              name="damageDepth"
              label="Kedalaman"
              placeholder="mm"
              required
            />
            <NumberField
              form={form}
              name="damagePointCount"
              label="Jumlah Titik"
              placeholder="jumlah"
              required
              isInteger
            />
            <NumberField
              form={form}
              name="deformation"
              label="Deformasi"
              placeholder="mm"
              required
            />
          </div>
        </div>

        {/* Section 3: Condition & Usage */}
        <div className="space-y-4">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground/80">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-xs text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
              3
            </span>
            Kondisi & Penggunaan
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <NumberField
              form={form}
              name="componentAge"
              label="Usia Komponen"
              placeholder="bulan"
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

        {/* Section 4: Classification & Notes */}
        <div className="space-y-4">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground/80">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
              4
            </span>
            Klasifikasi & Catatan
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="damageLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Level Kerusakan <span className="text-destructive">*</span>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ringan">Ringan</SelectItem>
                      <SelectItem value="sedang">Sedang</SelectItem>
                      <SelectItem value="berat">Berat</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Catatan</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Catatan tambahan (opsional)"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormActions
          isLoading={isLoading}
          isEditMode={isEditMode}
          onCancel={onCancel}
        />
      </form>
    </Form>
  );
}

// Helper components
interface FieldProps {
  form: UseFormReturn<DamageRecordFormValues>;
  name: keyof DamageRecordFormValues;
  label: string;
  placeholder: string;
  description?: string;
  required?: boolean;
  isInteger?: boolean;
}

function NumberField({
  form,
  name,
  label,
  placeholder,
  description,
  required,
  isInteger,
}: FieldProps) {
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

interface FormActionsProps {
  isLoading: boolean;
  isEditMode: boolean;
  onCancel: () => void;
}

function FormActions({ isLoading, isEditMode, onCancel }: FormActionsProps) {
  return (
    <div className="flex items-center gap-4 border-t pt-6">
      <Button type="submit" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Menyimpan...
          </>
        ) : (
          <>
            <Save className="mr-2 h-4 w-4" />
            {isEditMode ? "Simpan Perubahan" : "Simpan Data"}
          </>
        )}
      </Button>
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        disabled={isLoading}
      >
        Batal
      </Button>
    </div>
  );
}
