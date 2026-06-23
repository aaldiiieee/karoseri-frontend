import type { UseFormReturn } from "react-hook-form";
import { Loader2, Save } from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import type { UserFormValues } from "../schema/user.schema";

interface UserFormProps {
  form: UseFormReturn<UserFormValues>;
  onSubmit: (values: UserFormValues) => void;
  onCancel: () => void;
  isLoading?: boolean;
  isEditMode?: boolean;
}

export function UserForm({
  form,
  onSubmit,
  onCancel,
  isLoading = false,
  isEditMode = false,
}: UserFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Username <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Masukkan username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Password{" "}
                {!isEditMode ? (
                  <span className="text-destructive">*</span>
                ) : (
                  <span className="ml-1 text-xs text-muted-foreground">
                    (kosongkan jika tidak ingin diubah)
                  </span>
                )}
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder={
                    isEditMode ? "Password baru (opsional)" : "Masukkan password"
                  }
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Role <span className="text-destructive">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="technician">Teknisi</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {isEditMode && (
          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status Akun</FormLabel>
                <Select
                  onValueChange={(val) => field.onChange(val === "true")}
                  value={String(field.value)}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="true">Aktif</SelectItem>
                    <SelectItem value="false">Nonaktif</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

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
                {isEditMode ? "Simpan" : "Tambah"}
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
      </form>
    </Form>
  );
}
