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

import { COMPONENT_CATEGORIES } from "../constants/component.constant";
import type { ComponentFormValues } from "../schema/componentForm.schema";

interface KaroseriComponentFormProps {
  form: UseFormReturn<ComponentFormValues>;
  onSubmit: (values: ComponentFormValues) => void;
  onCancel: () => void;
  isLoading?: boolean;
  isEditMode?: boolean;
}

export function KaroseriComponentForm({
  form,
  onSubmit,
  onCancel,
  isLoading = false,
  isEditMode = false,
}: KaroseriComponentFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <CodeField form={form} disabled={isEditMode} />
        <NameField form={form} />
        <CategoryField form={form} />
        <DescriptionField form={form} />
        <FormActions
          isLoading={isLoading}
          isEditMode={isEditMode}
          onCancel={onCancel}
        />
      </form>
    </Form>
  );
}

interface FieldProps {
  form: UseFormReturn<ComponentFormValues>;
  disabled?: boolean;
}

function CodeField({ form, disabled }: FieldProps) {
  return (
    <FormField
      control={form.control}
      name="code"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            Kode Komponen <span className="text-destructive">*</span>
          </FormLabel>
          <FormControl>
            <Input
              placeholder="Contoh: BODY-001"
              {...field}
              onChange={(e) => field.onChange(e.target.value.toUpperCase())}
              disabled={disabled}
            />
          </FormControl>
          <FormDescription>
            Kode unik untuk identifikasi komponen. Gunakan huruf kapital, angka,
            strip (-), atau underscore (_).
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function NameField({ form }: FieldProps) {
  return (
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            Nama Komponen <span className="text-destructive">*</span>
          </FormLabel>
          <FormControl>
            <Input placeholder="Contoh: Panel Samping Kiri" {...field} />
          </FormControl>
          <FormDescription>
            Nama deskriptif untuk komponen karoseri.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function CategoryField({ form }: FieldProps) {
  return (
    <FormField
      control={form.control}
      name="category"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            Kategori <span className="text-destructive">*</span>
          </FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Pilih kategori komponen" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {COMPONENT_CATEGORIES.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>
            Klasifikasi komponen berdasarkan jenisnya.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function DescriptionField({ form }: FieldProps) {
  return (
    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Deskripsi</FormLabel>
          <FormControl>
            <Textarea
              placeholder="Masukkan deskripsi komponen (opsional)"
              className="min-h-[100px] resize-none"
              {...field}
            />
          </FormControl>
          <FormDescription>
            Informasi tambahan tentang komponen. Maksimal 500 karakter.
          </FormDescription>
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
    <div className="flex items-center gap-4 pt-4">
      <Button type="submit" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Menyimpan...
          </>
        ) : (
          <>
            <Save className="mr-2 h-4 w-4" />
            {isEditMode ? "Simpan Perubahan" : "Simpan Komponen"}
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
